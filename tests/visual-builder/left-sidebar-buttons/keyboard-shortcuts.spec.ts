const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { Settings            } from "../../../page-object/themes/settings";
import { MediaElements       } from "../../../page-object/themes/madia-elements";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import selectors from "../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
// const keyboard = require('../../../page-object/data-page.json').Themes.Builder; // local
const keyboard = require('../../../page-object/data-page.json').Themes.Builder.Remote; // remote
const data = require('../../../page-object/data-page.json').Themes.Builder;
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const car_fourth = 'data/images/car-4.png';

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

test("Keyboard Shortcuts:", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const mediaElements = new MediaElements(page);
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

    await test.step("Open keyboard shortcuts sidebar", async() => {
        await leftSidebarElements.openSidebar('keyboard_shortcuts');
    });

    await test.step("Check GENERAL data", async() => {
        await leftSidebarElements.checkKeyboardGeneral('Preview', 'P');
        await leftSidebarElements.checkKeyboardGeneral('Exit preview', 'PorEsc');
    });

    await test.step("Check COPY/PASTE data", async() => {
        await leftSidebarElements.checkKeyboardGeneral('Copy', 'CmdC');
        await leftSidebarElements.checkKeyboardGeneral('Paste', 'CmdV');
        await leftSidebarElements.checkKeyboardGeneral('Cut', 'CmdX');
        await leftSidebarElements.checkKeyboardGeneral('Duplicate', 'CmdDorCmdDrag');
        await leftSidebarElements.checkKeyboardGeneral('Delete', 'BackspaceorDelete');
        await leftSidebarElements.checkKeyboardGeneral('Copy styles', 'C');
        await leftSidebarElements.checkKeyboardGeneral('Paste styles', 'V');
    });

    await test.step("Check UNDO/REDO data", async() => {
        await leftSidebarElements.checkKeyboardGeneral('Undo', 'CmdZ');
        await leftSidebarElements.checkKeyboardGeneral('Redo', 'CmdShiftZ');
    });

    await test.step("Open preview using hotkey 'P'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Preview);
        await leftSidebarElements.checkPreviewOpened();
    });

    await test.step("Close preview using hotkey 'P'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Preview);
        await leftSidebarElements.checkPreviewClosed();
    });

    await test.step("Close preview using hotkey 'Esc'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Preview);
        await leftSidebarElements.checkPreviewOpened();
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.ExitPreview);
        await leftSidebarElements.checkPreviewClosed();
    });

    await test.step("Open elements sidebar", async() => {
        await leftSidebarElements.openSidebar('add');
    });

    await test.step("Add section in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Select 'Section' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.selectElementInLayers('Section','0');
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
        await settings.selectElementInLayers('Section','0');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Duplicate);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 2);
    });

    await test.step("Delete element using hotkey 'Backspace'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Backspace);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
    });

    // todo Cmd + Drag - https://www.notion.so/Hotkey-Cmd-Drag-don-t-duplicate-element-a14d550aa984450ca8d288ba49e2656c
    await test.step("Duplicate element using hotkey 'Cmd + D'", async() => {
        await settings.selectElementInLayers('Section','0');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Duplicate);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 2);
    });
    // await test.step("Duplicate element using hotkey 'Cmd + Drag'", async() => {
    //     await settings.selectElementInLayers('Section','0');
    //     await leftSidebarElements.hotkey(data.KeyboardShortcuts.Duplicate);
    //     await builderPage.checkNumberOfElements(`${selectors.body} app-b-empty`, 2);
    // });

    await test.step("Delete element using hotkey 'Delete'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Delete);
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
    });

    await test.step("Configure section in body", async() => {
        await settings.selectElementInLayers('Section','0');
        await leftSidebarElements.openSidebar('add');
    });

    await test.step("Add 'Image' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementsInSection('image', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Upload image(PNG) and element settings", async() => {
        await mediaElements.uploadImage(selectors.body,'image', car_fourth);
        await mediaElements.checkImagesCar(selectors.body,'image','4');
    });

    await test.step("Add section in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add 'Image' element to section (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementsInSection('image', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Select 'Image' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.selectElementInLayers('Image','0');
    });

    await test.step("Copy styles using hotkey 'C'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.CopyStyles);
    });

    await test.step("Past styles using hotkey 'V'", async() => {
        await settings.selectElementInLayers('Image','1');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.PasteStyles);
        await mediaElements.checkImagesCar(selectors.footer,'image','4');
    });

    await test.step("Undo the latter changing using hotkey 'Cmd + Z'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Undo);
        await builderPage.containerIsHidden(selectors.footer + ' [src*="car-4"]');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Undo);
        await builderPage.containerIsHidden(selectors.footer + ' app-image');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Undo);
        await builderPage.containerIsHidden(selectors.footer + ' app-section');
    });

    await test.step("Redo the latter changing using hotkey 'Cmd + Shift + Z'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Redo);
        await builderPage.containerIsVisible(selectors.footer + ' app-section');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Redo);
        await builderPage.containerIsVisible(selectors.footer + ' app-image');
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Redo);
        await builderPage.containerIsVisible(selectors.footer + ' [src*="car-4"]');
    });
});