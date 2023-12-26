const  { test                } = require('@playwright/test');
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
const car_second = 'data/images/car-2.jpeg';
const car_third = 'data/images/car-3.png';
const car_fifth = 'data/images/car-5.gif';

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

test("Check work of slider element", async ({page}) => {
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

    await test.step("Add and configure sections in header", async() => {
        await builderPage.addSectionInContainer(selectors.header);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Slider' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementSlider);
        await builderPage.addElementsInSection('slider', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'slider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Slider' element settings", async() => {
        await settings.sizeSection('1','0','100','300');
    });

    await test.step("Delete all and add one slide", async() => {
        await mediaElements.deleteAllSlide();
        await settings.openSection('Slides', 1);
    });

    await test.step("Upload image to first slider", async() => {
        await mediaElements.openSliders('1');
        await settings.backgroundSection('Image');
        await mediaElements.uploadImage(selectors.header,'slider', car_second);
        await settings.waitUploadImageInBackground('2');
        await mediaElements.backToSlider();
    });

    await test.step("'Slider' delete all options", async() => {
        await settings.optionsSection('slider','0');
        await settings.optionsSection('slider','1');
        await settings.optionsSection('slider','2');
        await settings.optionsSection('slider','3');
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Slider' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementSlider);
        await builderPage.addElementsInSection('slider', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'slider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Slider' element settings", async() => {
        await settings.sizeSection('1','0','100','300');
    });

    await test.step("Delete all and add two slide", async() => {
        await mediaElements.deleteAllSlide();
        await settings.openSection('Slides', 2);
    });

    await test.step("Upload image to first slider", async() => {
        await mediaElements.openSliders('1');
        await settings.backgroundSection('Image');
        await mediaElements.uploadImage(selectors.body,'slider', car_third);
        await settings.waitUploadImageInBackground('3');
        await mediaElements.backToSlider();
    });

    await test.step("Upload image to second slider", async() => {
        await mediaElements.openSliders('2');
        await settings.backgroundSection('Image');
        await mediaElements.uploadImage(selectors.body,'slider', car_fifth);
        await settings.waitUploadImageInBackground('5');
        await mediaElements.backToSlider();
    });

    await test.step("Add 'Divider' element to second tab (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementDivider);
        await builderPage.addElementsInSection('divider', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'divider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Divider' element settings", async() => {
        await settings.sizeSection('1','2','100','3');
        await settings.backgroundColor('transparent', data.Settings.colors.blue);
    });

    await test.step("Add and configure sections in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Slider' element to section (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementSlider);
        await builderPage.addElementsInSection('slider', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'slider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Slider' element settings", async() => {
        await settings.sizeSection('1','0','100','100');
    });

    await test.step("Delete all and add two slide", async() => {
        await mediaElements.deleteAllSlide();
        await settings.openSection('Slides', 2);
    });

    await test.step("Add color to first slider", async() => {
        await mediaElements.openSliders('1');
        await settings.backgroundSection('Color');
        await settings.backgroundColor('transparent', data.Settings.colors.red);
        await mediaElements.backToSlider();
    });

    await test.step("'Slider' delete all options", async() => {
        await settings.optionsSection('slider','0');
        await settings.optionsSection('slider','1');
        await settings.optionsSection('slider','2');
        await settings.optionsSection('slider','3');
    });

    await test.step("Add 'Divider' element to second tab (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementDivider);
        await builderPage.addElementsInSection('divider', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'divider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Divider' element settings", async() => {
        await settings.sizeSection('1','2','100','3');
        await settings.backgroundColor('transparent', data.Settings.colors.blue);
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check theme in preview", async() => {
        await mediaElements.checkElementInSection(selectors.header, 'slide');
        await mediaElements.checkElementInSection(selectors.body, 'divider');
        await mediaElements.checkElementInSection(selectors.body, 'slider-base');
        await mediaElements.checkDots(selectors.body,2);
        await mediaElements.checkElementInSection(selectors.footer, 'divider');
        await mediaElements.checkElementInSection(selectors.footer, 'slider-base');
    });
});