const  { test                 } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { MediaElements       } from "../../../page-object/themes/madia-elements";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import { Settings            } from "../../../page-object/themes/settings";
import selectors from "../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const data = require('../../../page-object/data-page.json').Themes.Builder;
const car_seventh = 'data/images/car-7.svg';

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

test("Check work of tab element", async ({page}) => {
    const universesNav = new UniversesNavPage(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const mediaElements = new MediaElements(page);
    const sidebarElements = new SidebarElements(page);
    const leftSidebarElements = new LeftSidebarElements(page);
    const settings = new Settings(page);

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

    await test.step("Add sections in footer", async() => {
        await builderPage.addSectionInContainer(selectors.header);
    });

    await test.step("Add 'Video' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementVideo);
        await builderPage.addElementsInSection('video', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'video');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add video (Youtube)", async() => {
        await mediaElements.settingsVideo('1', data.Settings.firstVideo);
    });

    await test.step("Add sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Add 'Tabs' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementTabs);
        await builderPage.addElementsInSection('tabs', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'tabs');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Fill data first tab", async() => {
        await mediaElements.fillTabsData('0', data.ProductData.topCarHeader);
        await mediaElements.fillTabsData('3', data.ProductData.topCarInfo);
    });

    await test.step("Add 'Image' element to first tab (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementInTab('image', data.ProductData.topCarInfo, selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add image (SVG)", async() => {
        await mediaElements.uploadImage(selectors.body,'image', car_seventh);
        await mediaElements.checkImagesCar(selectors.body,'image','7');
    });

    await test.step("Fill data and settings tab title", async() => {
        await mediaElements.fillTabsData('1', data.ProductData.urusHeader);
        await settings.openMatTabLabels('ACTIVE');
        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.red);
        await settings.openSection('Border', 1);
        await settings.borderSection('4', data.Settings.colors.black);
        await settings.openSection('Corner radius', 1);
        await settings.cornerRadiusSection('0', '15');
    });

    await test.step("Second tab settings", async() => {
        await mediaElements.fillTabsData('4', data.ProductData.urusInfo);
        await settings.openMatTabLabels('ACTIVE');
        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.red);
        await settings.openSection('Border', 1);
        await settings.borderSection('4', data.Settings.colors.black);
        await settings.openSection('Corner radius', 1);
        await settings.cornerRadiusSection('0', '15');
    });

    await test.step("Fill data third tab", async() => {
        await mediaElements.fillTabsData('2', data.ProductData.elementText);
        await mediaElements.fillTabsData('5', data.ProductData.contactUs);
    });

    await test.step("Add 'Video' element to third tab (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementVideo);
        await builderPage.addElementInTab('video', data.ProductData.contactUs, selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'video');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add video (Youtube)", async() => {
        await mediaElements.settingsVideo('1', data.Settings.secondVideo);
    });

    await test.step("Check that the footer is empty", async() => {
        await builderPage.sectionIsVisible(selectors.footer);
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check theme in preview", async() => {
        await mediaElements.checkVideo(selectors.header, data.Settings.firstVideoTitle);
        await mediaElements.checkTabsData('0','3', data.ProductData.topCarHeader, data.ProductData.topCarInfo);
        await mediaElements.checkImagesCar(selectors.body,'image','7');
        await mediaElements.checkTabsData('1','4', data.ProductData.urusHeader, data.ProductData.urusInfo);
        await mediaElements.checkTabsData('2','5', data.ProductData.elementText, data.ProductData.contactUs);
        await mediaElements.checkVideo(selectors.body, data.Settings.secondVideoTitle);
    });

    await test.step("Check that the footer is hidden", async() => {
        await builderPage.sectionIsHidden(selectors.footer);
    });
});