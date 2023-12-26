const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { ECommerceElements   } from "../../../page-object/themes/e-commerce-elements";
import { TextElements        } from "../../../page-object/themes/text-elements";
import { NavigationElements  } from "../../../page-object/themes/navigation-elements";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import { Settings            } from "../../../page-object/themes/settings";
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
// todo element temporarily removed
// test("Check work of standart menu element", async ({page}) => {
//     const settings = new Settings(page);
//     const themesPage = new ThemesPage(page);
//     const builderPage = new BuilderPage(page);
//     const textElements = new TextElements(page);
//     const universesNav = new UniversesNavPage(page);
//     const sidebarElements = new SidebarElements(page);
//     const eCommerceElements = new ECommerceElements(page);
//     const navigationElements = new NavigationElements(page);
//     const leftSidebarElements = new LeftSidebarElements(page);
//
//     await test.step("Open themes page", async() => {
//         await universesNav.openPage('image');
//     });
//
//     await test.step("Delete old themes and create new", async() => {
//         await themesPage.deleteThemes();
//         await themesPage.createTheme(themeName,'brush','1');
//     });
//
//     await test.step("Choose devise", async() => {
//         await sidebarElements.chooseDevise('Infinite Canvas');
//     });
//
//     await test.step("Add sections in header, body and footer", async() => {
//         await builderPage.addSectionInContainer(selectors.header);
//         await builderPage.addSectionInContainer(selectors.body);
//         await builderPage.addSectionInContainer(selectors.footer);
//     });
//
//     await test.step("Add 'Standart Menu' element to section (header)", async() => {
//         await leftSidebarElements.searchElement(data.Elements.elementStandartMenu);
//         await builderPage.addElementsInSection('nav_menu', selectors.header);
//         await builderPage.waitElementInSection(selectors.header, 'text >> nth=0');
//         await leftSidebarElements.clearSearchInput();
//     });
//
//     await test.step("'Standart Menu' element first button (Add item to cart) settings ", async() => {
//         await navigationElements.standartMenuSectionSettings('0');
//         await navigationElements.fillTextInStandartMenu('0','Product');
//         await builderPage.chooseLayer('button');
//         await settings.openActionsSection('Add item to cart');
//         await settings.fillActionsOption(data.LamborghiniCountachData.productName);
//         await settings.checkActiveOptionsInActions(data.LamborghiniCountachData.productName);
//     });
//
//     await test.step("'Standart Menu' element second button (Go to page) settings ", async() => {
//         await builderPage.chooseLayer('navigation_menu');
//         await navigationElements.standartMenuSectionSettings('1');
//         await navigationElements.fillTextInStandartMenu('1','Go to');
//         await builderPage.chooseLayer('button');
//         await settings.openActionsSection('Go to page');
//         await settings.fillActionsOption('Collection List');
//         await settings.checkActiveOptionsInActions('Collection List');
//     });
//
//     await test.step("'Standart Menu' element third button (Anchor) settings ", async() => {
//         await builderPage.chooseLayer('navigation_menu');
//         await navigationElements.standartMenuSectionSettings('2');
//         await navigationElements.fillTextInStandartMenu('2','Anchor');
//         await builderPage.chooseLayer('button');
//         await settings.openActionsSection('Anchor');
//         await settings.fillAnchorOption('Section','Footer','Section');
//     });
//
//     await test.step("'Standart Menu' element fourth button (Go back) settings ", async() => {
//         await builderPage.chooseLayer('navigation_menu');
//         await navigationElements.standartMenuSectionSettings('3');
//         await navigationElements.fillTextInStandartMenu('3','Go back');
//         await builderPage.chooseLayer('button');
//         await settings.openActionsSection('Go back');
//     });
//
//     await test.step("Add 'Cart' and 'Cart Quantity' elements to section (body)", async() => {
//         await builderPage.chooseLayer('header');
//         await leftSidebarElements.searchElement(data.Elements.elementCart);
//         await builderPage.addElementsInSection('cart', selectors.body);
//         await builderPage.waitElementInSection(selectors.body, 'cart-quantity');
//         await builderPage.addElementsInSection('cart_table', selectors.body);
//         await builderPage.waitElementInSection(selectors.body, 'cart');
//         await leftSidebarElements.clearSearchInput();
//     });
//
//     await test.step("Add 'Text' element to section (footer) and configure settings", async() => {
//         await leftSidebarElements.searchElement(data.Elements.elementText);
//         await builderPage.addElementsInSection('text', selectors.footer);
//         await builderPage.waitElementInSection(selectors.footer, 'text');
//         await leftSidebarElements.clearSearchInput();
//     });
//
//     await test.step("Text element settings", async() => {
//         await textElements.fillTextElement(selectors.footer,'text', data.ProductData.contactUs);
//     });
//
//     await test.step("Open 'Collection List' page", async() => {
//         await leftSidebarElements.changePage('Collection List');
//     });
//
//     await test.step("Add sections in body", async() => {
//         await builderPage.addSectionInContainer(selectors.body);
//     });
//
//     await test.step("Add 'Rich text' element to section (body)", async() => {
//         await leftSidebarElements.searchElement(data.Elements.elementRichText);
//         await builderPage.addElementsInSection('rich_text', selectors.body);
//         await builderPage.waitElementInSection(selectors.body, 'image');
//         await leftSidebarElements.clearSearchInput();
//     });
//
//     await test.step("Make copy of elemental 'rich text'", async() => {
//         await leftSidebarElements.openSidebar('duplicate');
//         await builderPage.waitElementInSection(selectors.body, 'image >> nth=1');
//     });
//
//     await test.step("Open 'Home' page", async() => {
//         await leftSidebarElements.changePage('Home');
//     });
//
//     await test.step("Open preview", async() => {
//         await leftSidebarElements.openPreview();
//     });
//
//     await test.step("Add and check product", async() => {
//         await navigationElements.clickStandartMenuButton('Product');
//         await eCommerceElements.checkContent(selectors.body, 'cart',1);
//         await eCommerceElements.checkProductTitle(selectors.body,'cart','0', data.LamborghiniCountachData.productName);
//     });
//
//     await test.step("Go to Collection List page", async() => {
//         await navigationElements.clickStandartMenuButton('Go to');
//         await builderPage.waitElementInSection(selectors.body, 'image >> nth=1');
//     });
//
//     await test.step("Go down to footer", async() => {
//         await builderPage.containerIsHidden(selectors.footer);
//         await navigationElements.clickStandartMenuButton('Anchor');
//         await builderPage.containerIsVisible(selectors.footer);
//     });
//
//     await test.step("Go to Home page", async() => {
//         await builderPage.waitElementInSection(selectors.body, 'image >> nth=1');
//         await navigationElements.clickStandartMenuButton('Go back');
//         await eCommerceElements.checkContent(selectors.body, 'cart',1);
//         await eCommerceElements.checkProductTitle(selectors.body,'cart','0', data.LamborghiniCountachData.productName);
//     });
// });