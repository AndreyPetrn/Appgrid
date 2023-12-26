const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import { Settings            } from "../../../page-object/themes/settings";
import { ECommerceElements   } from "../../../page-object/themes/e-commerce-elements";
import selectors from "../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const streetAddress = faker.address.streetAddress();
const suiteOrApt = faker.random.alphaNumeric(3)
const city = faker.address.city();
const data = require('../../../page-object/data-page.json').Themes.Builder;

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await test.step("Login", async() => {
        await page.goto(browser, {waitUntil: "load"});
        await loginPage.login(await user);
    });
});

test.afterAll(async ({page}) => {
    await page.close();
});

test("Check work of checkout form elements", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const universesNav = new UniversesNavPage(page);
    const sidebarElements = new SidebarElements(page);
    const eCommerceElements = new ECommerceElements(page);
    const leftSidebarElements = new LeftSidebarElements(page);

    await test.step("Open themes page", async() => {
        await universesNav.openPage('image');
    });

    await test.step("Delete old themes and create new", async() => {
        await themesPage.deleteThemes();
        await themesPage.createTheme(themeName,'brush','1');
    });

    await test.step("Choose devise", async() => {
        await sidebarElements.chooseDevise('Infinite Canvas');
    });

    await test.step("Add sections in header", async() => {
        await builderPage.addSectionInContainer(selectors.header);
    });

    await test.step("Add 'Buy Button' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementBuyButton);
        await builderPage.addElementsInSection('button', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'buy-button');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Buy Button' element settings", async() => {
        await settings.alignmentSection('center');
        await settings.productSettings(data.LamborghiniCountachData.productName);
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Checkout Form' elements to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCheckoutForm);
        await builderPage.addElementsInSection('checkout_form', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'checkout-form');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Add product to cart", async() => {
        await eCommerceElements.clickOnButton(selectors.header,'buy');
        await eCommerceElements.checkPopUpNotification(data.Notification.lcAddedToCart);
    });

    await test.step("Fill in 'Contact information' input", async() => {
        await eCommerceElements.getCheckoutFormTitle('email', data.CheckoutFormData.firstTitle)
        await eCommerceElements.fillContactInformation(data.ShippingData.email);
        await eCommerceElements.clickContinue(data.CheckoutFormData.firstContinueBtn);
    });

    await test.step("Fill in 'Shipping Address' inputs", async() => {
        await eCommerceElements.getCheckoutFormTitle('address', data.CheckoutFormData.secondTitle);
        await eCommerceElements.fillShippingAddressInput('0', firstName);
        await eCommerceElements.fillShippingAddressInput('1', lastName);
        await eCommerceElements.fillShippingAddressInput('2', streetAddress);
        await eCommerceElements.fillShippingAddressInput('3', suiteOrApt);
        await eCommerceElements.fillShippingAddressInput('4', city);
        await eCommerceElements.selectCountry(data.ShippingData.country);
        await eCommerceElements.fillShippingAddressInput('5', data.ShippingData.zipCode);
        await eCommerceElements.fillShippingAddressInput('6', data.ShippingData.phoneNumber);
        await eCommerceElements.clickContinue(data.CheckoutFormData.secondContinueBtn);
    });

    await test.step("Fill in 'Shipping Method' input", async() => {
        await eCommerceElements.getCheckoutFormTitle('shipping', data.CheckoutFormData.thirdTitle)
        await eCommerceElements.fillShippingMethod();
        await eCommerceElements.clickContinue(data.CheckoutFormData.thirdContinueBtn);
    });
});