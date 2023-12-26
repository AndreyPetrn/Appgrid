const  { test                } = require('@playwright/test');
import { Constants           } from "../../../../data/const";
import { Settings            } from "../../../../page-object/themes/settings";
import { BuilderPage         } from "../../../../page-object/themes/builder";
import { SidebarElements     } from "../../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../../page-object/themes/left-sidebar";
import { LayoutElements      } from "../../../../page-object/themes/layout-elements";
import { UniversesNavPage    } from "../../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../../page-object/themes/themes-page";
import selectors from "../../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const keyboard = require('../../../../page-object/data-page.json').Themes.Builder; // local
// const keyboard = require('../../../../page-object/data-page.json').Themes.Builder.Remote; // remote
const data = require('../../../../page-object/data-page.json').Themes.Builder;
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const copyStyle = 'copy-style.png';
const undoChanging = 'undo-changing.png';

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

test("Using hotkey, buttons in builder and layers:", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const universesNav = new UniversesNavPage(page);
    const layoutElements = new LayoutElements(page);
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

    await test.step("Add section in header", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Copy element using hotkey 'Cmd + C'", async() => {
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Copy);
    });

    await test.step("Paste element using hotkey 'Cmd + V'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Paste);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 2);
    });

    await test.step("Cut element using hotkey 'Cmd + X'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Cut);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
    });

    await test.step("Duplicate element using hotkey 'Cmd + D'", async() => {
        await layoutElements.clickOnSection(selectors.body,'0');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Duplicate);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 2);
    });

    await test.step("Delete element using hotkey 'Backspace'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Backspace);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
    });

    // todo Cmd + Drag - https://www.notion.so/Hotkey-Cmd-Drag-don-t-duplicate-element-a14d550aa984450ca8d288ba49e2656c
    await test.step("Duplicate element using hotkey 'Cmd + D'", async() => {
        await layoutElements.clickOnSection(selectors.body,'0');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Duplicate);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 2);
    });
    // await test.step("Duplicate element using hotkey 'Cmd + Drag'", async() => {
    //     await builderPage.clickOnSection(selectors.body,'0');
    //     await leftSidebarElements.hotkey(data.KeyboardShortcuts.Duplicate);
    //     await builderPage.checkNumberOfElements(`${selectors.body} app-b-empty`, 2);
    // });

    await test.step("Delete element using hotkey 'Delete'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Delete);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
    });

    await test.step("Configure section in body", async() => {
        await layoutElements.clickOnSection(selectors.body,'0');

        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.red);
    });

    await test.step("Add section in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Copy styles using hotkey 'C'", async() => {
        await layoutElements.clickOnSection(selectors.body,'0');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.CopyStyles);
    });

    await test.step("Past styles using hotkey 'V'", async() => {
        await layoutElements.clickOnSection(selectors.footer,'0');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.PasteStyles);
    });

    await test.step("Verify that the section style is copied", async() => {
        await builderPage.checkScreenshot(selectors.body + ' app-b-empty', selectors.builder, copyStyle);
    });

    await test.step("Undo the latter changing using hotkey 'Cmd + Z'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Undo);
    });

    await test.step("Verify that the last changes have been canceled", async() => {
        await builderPage.checkScreenshot(selectors.body + ' app-b-empty', selectors.builder, undoChanging);
    });

    await test.step("Redo the latter changing using hotkey 'Cmd + Shift + Z'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Redo);
    });

    await test.step("Verify that the latest changes have been returned", async() => {
        await builderPage.checkScreenshot(selectors.body + ' app-b-empty', selectors.builder, copyStyle);
    });
});