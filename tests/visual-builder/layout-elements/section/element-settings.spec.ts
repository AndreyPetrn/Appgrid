const  { test                } = require('@playwright/test');
import { Constants           } from "../../../../data/const";
import { Settings            } from "../../../../page-object/themes/settings";
import { BuilderPage         } from "../../../../page-object/themes/builder";
import { SidebarElements     } from "../../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../../page-object/themes/left-sidebar";
import { UniversesNavPage    } from "../../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../../page-object/themes/themes-page";
import selectors from "../../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const data = require('../../../../page-object/data-page.json').Themes.Builder;
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const sectionSettings = 'section-settings.png';
const pressSectionSettings = 'press-section-settings.png';

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

test("Section element settings:", async ({page}) => {
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

    await test.step("Add section in header", async() => {
        await builderPage.addSectionInContainer(selectors.header);
    });

    await test.step("'Section' element settings", async() => {
        await settings.fillMargin('10','10','10','10');
        await settings.fillPadding('10','10','10','10');

        await settings.alignmentSection('center');

        await settings.sizeSection('0', '0', '100', '100');

        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.red);

        await settings.openSection('Border',1);
        await settings.borderSection('5', data.Settings.colors.black);

        await settings.openSection('Corner radius', 1);
        await settings.cornerRadiusSection('0','20');

        await settings.openSection('Transform', 1);
        await settings.transformSettings('0','10','10','90','15');

        await settings.openSection('Shadow', 1);
        await settings.shadowSettings(data.Settings.colors.blue,'15','-15','5','5');

        await settings.openSection('Effects', 1);
        await settings.effectsSettings('90','1','10');
    });

    await test.step("Make sure settings are displayed in builder", async() => {
        await builderPage.checkScreenshotInIframe(selectors.header, sectionSettings);
    });

    await test.step("Pressing effects settings", async() => {
        await settings.openSection('Pressing Effects', 1);
        await settings.pressingEffectsSettings('50','50','0','Test');
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
        await leftSidebarElements.checkPreviewOpened();
    });

    await test.step("Make sure that settings are displayed when click on element in builder", async() => {
        await builderPage.pressAndCheckScreenshot(' app-b-empty', selectors.header, pressSectionSettings);
    });
});