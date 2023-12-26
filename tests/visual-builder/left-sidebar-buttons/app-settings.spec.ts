const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { TextElements        } from "../../../page-object/themes/text-elements";
import { BuilderPage         } from "../../../page-object/themes/builder";
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

test("App Settings:", async ({page}) => {
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const textElements = new TextElements(page);
    const universesNav = new UniversesNavPage(page);
    const leftSidebarElements = new LeftSidebarElements(page);

    await test.step("Open themes page", async() => {
        await universesNav.openPage('image');
    });

    await test.step("Delete old themes and create new", async() => {
        await themesPage.deleteThemes();
        await themesPage.createTheme(themeName,'brush','1');
    });

    await test.step("Add section in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Add a 'Text' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Open app settings sidebar", async() => {
        await leftSidebarElements.openSidebar('app_settings');
    });

    await test.step("Manage fonts", async() => {
        await leftSidebarElements.openManageFonts();
        await leftSidebarElements.installFonts('Satisfy');
        await leftSidebarElements.closeManageFonts();
        await leftSidebarElements.selectFont('Satisfy');
        await textElements.checkValueFont('Satisfy');
    });

    await test.step("Size settings", async() => {
        await leftSidebarElements.size();
        await textElements.checkValueSize('20');
    });

    await test.step("Height settings", async() => {
        await leftSidebarElements.height('3');
        await textElements.checkValueHeight('3');
    });

    await test.step("Height settings", async() => {
        await leftSidebarElements.height('3');
        await textElements.checkValueHeight('3');
    });

    await test.step("Color settings", async() => {
        await leftSidebarElements.color('FF0000');
        await textElements.checkValueColor('255, 0, 0');
    });

    await test.step("Background settings", async() => {
        await leftSidebarElements.background('000000');
        await textElements.checkBackground('0, 0, 0');
    });

    await test.step("Safe area top settings", async() => {
        await leftSidebarElements.safeAreaTop('FFFF00');
        await textElements.checkBackground('255, 255, 0');
    });

    await test.step("Safe area bottom settings", async() => {
        await leftSidebarElements.safeAreaBottom('Sticky','00FFFF');
        await textElements.checkBackground('0, 255, 255');
    });
});