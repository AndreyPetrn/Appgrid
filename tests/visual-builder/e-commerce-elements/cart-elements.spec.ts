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

test("Check work of cart elements", async ({page}) => {
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

    await test.step("Add 'Cart' and 'Cart Quantity' elements to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCart);
        await builderPage.addElementsInSection('cart', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'cart-quantity');
        await builderPage.addElementsInSection('cart_table', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'cart');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add sections in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add 'Buy Button' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementBuyButton);
        await builderPage.addElementsInSection('button', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'buy-button');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Buy Button' element settings", async() => {
        await settings.alignmentSection('center');
        await settings.productSettings(data.VeyronData.productName);
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Add and check product in cart", async() => {
        await eCommerceElements.clickOnButton(selectors.header,'buy');
        await eCommerceElements.checkPopUpNotification(data.Notification.lcAddedToCart);
        await eCommerceElements.checkContent(selectors.body, 'cart',1);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','0', data.LamborghiniCountachData.productName);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','2', data.LamborghiniCountachData.productPrice);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','3', data.LamborghiniCountachData.productOldPrice);
    });

    await test.step("Add/remove quantity of products", async() => {
        await eCommerceElements.clickOnButton(selectors.header,'buy');
        await eCommerceElements.checkPopUpNotification(data.Notification.lcAddedToCart);
    });

    await test.step("Add and check product in cart", async() => {
        await eCommerceElements.clickOnButton(selectors.footer,'buy');
        await eCommerceElements.checkPopUpNotification(data.Notification.vAddedToCart);
        await eCommerceElements.checkContent(selectors.body, 'cart',2);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','0', data.LamborghiniCountachData.productName);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','2', data.LamborghiniCountachData.productPrice);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','3', data.LamborghiniCountachData.productOldPrice);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','4', data.VeyronData.productName);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','6', data.VeyronData.productPrice);
        await eCommerceElements.checkProductTitle(selectors.body,'cart','7', data.VeyronData.productOldPrice);
    });
});