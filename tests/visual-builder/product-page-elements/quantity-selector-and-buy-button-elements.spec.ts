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

test("Integration of 'Quantity selector' and 'Buy button' elements", async ({page}) => {
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

    await test.step("Add 'Section' element to body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Element Group' element to section", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementElementGroup);
        await builderPage.addElementsInSection('element_group', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'element-container+app-section');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Element Group' element settings", async() => {
        await settings.sizeSection('0','1','','100');
        await settings.nodeBindingSettings('Product', data.LamborghiniCountachData.productName);
    });

    await test.step("Add 'Buy Button' element to 'Element Group' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementBuyButton);
        await builderPage.addElementInBasicContainer('button', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'buy-button');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Quantity Selector' element to 'Element Group' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementQuantitySelector);
        await builderPage.addElementInBasicContainer('quantity_selector', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'quantity-selector');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add sections in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add 'Cart' elements to section (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCart);
        await builderPage.addElementsInSection('cart_table', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'cart');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Add and check one product in cart", async() => {
        await eCommerceElements.checkTotalCart('CA$0.00');
        await eCommerceElements.clickOnButton(selectors.body,'buy');
        await eCommerceElements.checkPopUpNotification(data.Notification.lcAddedToCart);
        await eCommerceElements.checkContent(selectors.footer, 'cart',1);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','0', data.LamborghiniCountachData.productName);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','2', data.LamborghiniCountachData.productPrice);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','3', data.LamborghiniCountachData.productOldPrice);
        await eCommerceElements.checkTotalCart('CA$100.00');
    });

    await test.step("Remove product from Cart List", async() => {
        await eCommerceElements.clickProductIcon(selectors.footer,'cross',1);
    });

    await test.step("Add and check five products in cart", async() => {
        await eCommerceElements.checkTotalCart('CA$0.00');
        await eCommerceElements.clickProductIcon(selectors.body,'plus',4);
        await eCommerceElements.clickOnButton(selectors.body,'buy');
        await eCommerceElements.checkPopUpNotification(data.Notification.lcAddedToCart);
        await eCommerceElements.checkContent(selectors.footer, 'cart',1);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','0', data.LamborghiniCountachData.productName);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','2', data.LamborghiniCountachData.productPrice);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','3', data.LamborghiniCountachData.productOldPrice);
        await eCommerceElements.checkTotalCart('CA$500.00');
    });
});