const  { test                } = require('@playwright/test');
import { Constants           } from "../../../../data/const";
import { UniversesNavPage    } from "../../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../../page-object/login/loginPage";
import { BuilderPage         } from "../../../../page-object/themes/builder";
import { ThemesPage          } from "../../../../page-object/themes/themes-page";
import { SidebarElements     } from "../../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../../page-object/themes/left-sidebar";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
import selectors from "../../../../page-object/themes/selectors";
const user = UserDataHelper.getUser('user_builder');
const data = require('../../../../page-object/data-page.json').Themes.Builder;
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

test("Collection grid from pre-built block must be added to body", async ({page}) => {
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

    await test.step("Add 'collection grid 1' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 1', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 2' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 2', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 3' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 3', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 4' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 4', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 5' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 5', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 6' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 6', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 7' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 7', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 8' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 8', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 9' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 9', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
        await leftSidebarElements.hotkey(data.KeyboardShortcuts.Delete);
    });

    await test.step("Add 'collection grid 10' to body", async() => {
        await leftSidebarElements.openSidebar('pre_built');
        await leftSidebarElements.selectPreBuildBlock('Collection grid');
        await leftSidebarElements.addPreBuildBlockInContainer('Collection grid 10', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await builderPage.waitElementInSection(selectors.body, 'pagination');
    });
});