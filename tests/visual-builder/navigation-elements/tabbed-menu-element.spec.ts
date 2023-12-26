const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
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

test("Check work of tabbed menu element", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const textElements = new TextElements(page);
    const universesNav = new UniversesNavPage(page);
    const sidebarElements = new SidebarElements(page);
    const navigationElements = new NavigationElements(page);
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

    await test.step("Add sections in header, body and footer", async() => {
        await builderPage.addSectionInContainer(selectors.header);
        await builderPage.addSectionInContainer(selectors.body);
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add 'Header' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementHeading);
        await builderPage.addElementsInSection('heading', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Heading element settings", async() => {
        await textElements.fillTextElement(selectors.header,'text', data.ProductData.themeHeader);
        await textElements.checkTextInElement(selectors.header,'text', data.ProductData.themeHeader);
    });

    await test.step("Add 'Text' element to section (body) and configure settings", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Text element settings", async() => {
        await textElements.fillTextElement(selectors.body,'text', 'Home');
        await textElements.checkTextInElement(selectors.body,'text','Home');
    });

    await test.step("Add 'Text' element to section (footer) and configure settings", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Text element settings", async() => {
        await textElements.fillTextElement(selectors.footer,'text', data.ProductData.contactUs);
        await textElements.checkTextInElement(selectors.footer,'text', data.ProductData.contactUs);
    });

    await test.step("Add 'Tabbed Menu' element to footer", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementTabbedMenu);
        await builderPage.addTabbedMenuInContainer();
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Tabbed Menu' element settings", async() => {
        await navigationElements.tabbedSectionSettings('0');
        await builderPage.chooseLayer('button');
        await settings.fillActionsOption('Home');
        await navigationElements.checkActiveSection('Home');
        await settings.checkActiveOptionsInActions('Home');
    });

    await test.step("Check the default settings for 'Tabbed Menu' element", async() => {
        await navigationElements.tabbedSectionSettings('1');
        await builderPage.chooseLayer('button');
        await settings.checkActiveOptionsInActions('Collection List');
        await builderPage.chooseLayer('tabs');
        await navigationElements.tabbedSectionSettings('2');
        await builderPage.chooseLayer('button');
        await settings.checkActiveOptionsInActions('Wish List Page');
        await navigationElements.checkWishListQuantity('0');
        await builderPage.chooseLayer('tabs');
        await navigationElements.tabbedSectionSettings('3');
        await builderPage.chooseLayer('button');
        await settings.checkActiveOptionsInActions('Shopping Cart');
        await navigationElements.checkCartQuantity('0');
    });

    await test.step("Open 'Collection List' page", async() => {
        await leftSidebarElements.changePage('Collection List');
    });

    await test.step("Add sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Add 'Text' element to section (body) and configure settings", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Text element settings", async() => {
        await textElements.fillTextElement(selectors.body,'text', 'Collection List');
        await textElements.checkTextInElement(selectors.body,'text','Collection List');
    });

    await test.step("Open 'Wish List Page' page", async() => {
        await leftSidebarElements.changePage('Wish List Page');
    });

    await test.step("Add sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Add 'Text' element to section (body) and configure settings", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Text element settings", async() => {
        await textElements.fillTextElement(selectors.body,'text', 'Wish List Page');
        await textElements.checkTextInElement(selectors.body,'text','Wish List Page');
    });

    await test.step("Open 'Shopping Cart' page", async() => {
        await leftSidebarElements.changePage('Shopping Cart');
    });

    await test.step("Add sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Add 'Text' element to section (body) and configure settings", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Text element settings", async() => {
        await textElements.fillTextElement(selectors.body,'text', 'Shopping Cart');
        await textElements.checkTextInElement(selectors.body,'text','Shopping Cart');
        await builderPage.chooseLayer('element_group');
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check 'home' page", async() => {
        await navigationElements.clickTabbedMenuIcon('home');
        await navigationElements.checkActiveSection('Home');
        await textElements.checkTextInElement(selectors.header,'text', data.ProductData.themeHeader);
        await textElements.checkTextInElement(selectors.body,'text','Home');
        await textElements.checkTextInElement(selectors.footer,'text', data.ProductData.contactUs);
    });

    await test.step("Check 'Collection List' page", async() => {
        await navigationElements.clickTabbedMenuIcon('catalog');
        await navigationElements.checkActiveSection('Catalog');
        await textElements.checkTextInElement(selectors.header,'text', data.ProductData.themeHeader);
        await textElements.checkTextInElement(selectors.body,'text','Collection List');
        await textElements.checkTextInElement(selectors.footer,'text', data.ProductData.contactUs);
    });

    await test.step("Check 'Wish List Page' page", async() => {
        await navigationElements.clickTabbedMenuIcon('heart');
        await navigationElements.checkActiveSection('Wishlist');
        await textElements.checkTextInElement(selectors.header,'text', data.ProductData.themeHeader);
        await textElements.checkTextInElement(selectors.body,'text','Wish List Page');
        await textElements.checkTextInElement(selectors.footer,'text', data.ProductData.contactUs);
    });

    await test.step("Check 'Shopping Cart' page", async() => {
        await navigationElements.clickTabbedMenuIcon('shopping-bag');
        await navigationElements.checkActiveSection('Cart');
        await textElements.checkTextInElement(selectors.header,'text', data.ProductData.themeHeader);
        await textElements.checkTextInElement(selectors.body,'text','Shopping Cart');
        await textElements.checkTextInElement(selectors.footer,'text', data.ProductData.contactUs);
    });
});