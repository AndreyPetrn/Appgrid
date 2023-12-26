const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { Settings            } from "../../../page-object/themes/settings";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import selectors from "../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const data = require('../../../page-object/data-page.json').Themes.Builder;
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;

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

test("Layers:", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const universesNav = new UniversesNavPage(page);
    const sidebarElements = new SidebarElements(page);
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

    await test.step("Select 'Header' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.selectElementInLayers('Header','0');
        await leftSidebarElements.checkOutlineSelected('Header');
    });

    await test.step("Select 'Body' in layers", async() => {
        await settings.selectElementInLayers('Body','0');
        await leftSidebarElements.checkOutlineSelected('Body');
    });

    await test.step("Select 'Footer' in layers", async() => {
        await settings.selectElementInLayers('Footer','0');
        await leftSidebarElements.checkOutlineSelected('Footer');
    });

    await test.step("Add sections in header", async() => {
        await leftSidebarElements.openSidebar('add');
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Duplicate element in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
        await settings.duplicateElementInLayers('Section','0');
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 2);
    });

    await test.step("Delete element in layers", async() => {
        await settings.deleteElementInLayers('Section','1');
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
        await settings.deleteElementInLayers('Section','0');
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 0);
    });

    await test.step("Add sections in header, body, footer", async() => {
        await leftSidebarElements.openSidebar('add');
        await builderPage.addSectionInContainer(selectors.header);
        await builderPage.addSectionInContainer(selectors.body);
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add a 'Text' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Image' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementsInSection('image', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Search bar' element to section (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementSearchBar);
        await builderPage.addElementsInSection('search_bar', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'search-bar');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Select 'Text' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await leftSidebarElements.searchElement('Text');
        await leftSidebarElements.selectElementInLayers();
        await leftSidebarElements.checkOutlineSelected('Text');
    });

    await test.step("Select 'Image' in layers", async() => {
        await leftSidebarElements.searchElement('Image');
        await leftSidebarElements.selectElementInLayers();
        await leftSidebarElements.checkOutlineSelected('Image');
    });

    await test.step("Select 'Search bar' in layers", async() => {
        await leftSidebarElements.searchElement('Search bar');
        await leftSidebarElements.selectElementInLayers();
        await leftSidebarElements.checkOutlineSelected('Search bar');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Expand all", async() => {
        await leftSidebarElements.clickTreeActions('Expand All');
        await leftSidebarElements.checkNumberOfElements('app-tree-item',9);
    });
    await test.step("Collapse all", async() => {
        await leftSidebarElements.clickTreeActions('Collapse All');
        await leftSidebarElements.checkNumberOfElements('app-tree-item',3);
    });
});