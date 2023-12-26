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

test("Check work of thumbnail gallery element", async ({page}) => {
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
        await themesPage.createTheme(themeName,'brush', '1');
    });

    await test.step("Choose devise", async() => {
        await sidebarElements.chooseDevise('Infinite Canvas');
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Thumbnail Gallery' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementThumbnailGallery);
        await builderPage.addElementsInSection('thumbnail_gallery', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'thumbnail-gallery-light');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Select template and add images in 'Thumbnail Gallery'", async() => {
        await mediaElements.selectTemplate('1');
        await mediaElements.uploadImage(selectors.body,'thumbnail-gallery-light', car_second);
        await mediaElements.checkImagesCar(selectors.body,'thumbnail-gallery-light','2');

        await mediaElements.uploadImage(selectors.body,'thumbnail-gallery-light', car_third);
        await mediaElements.checkImagesCar(selectors.body,'thumbnail-gallery-light .thumbnail-gallery__thumbs','3');

        await mediaElements.uploadImage(selectors.body,'thumbnail-gallery-light', car_fifth);
        await mediaElements.checkImagesCar(selectors.body,'thumbnail-gallery-light .thumbnail-gallery__thumbs','5');

        await settings.optionsSection('thumbnail','1');
    });

    await test.step("Add 'Overflow Box' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementOverflowBox);
        await builderPage.addOverflowBoxElementInContainer(selectors.body);
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Overflow Box' element settings", async() => {
        await mediaElements.fillOverflowBox('top_right');
    });

    await test.step("Add 'Icon' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementIcon);
        await builderPage.addElementInEmptySection('icon', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'icon');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Icon' element settings", async() => {
        await settings.sizeSection('0', '0', '50', '50');

        await mediaElements.fillIconData('50', data.Settings.colors.black);
        await mediaElements.chooseIcon('last_page', selectors.body);

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Collection List');

        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.red);

        await settings.openSection('Border', 1);
        await settings.borderSection('5', data.Settings.colors.black);

        await settings.openSection('Corner radius', 1);
        await settings.cornerRadiusSection('0', '30');
    });

    await test.step("Open 'Collection List' page", async() => {
        await leftSidebarElements.changePage('Collection List');
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Thumbnail Gallery' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementThumbnailGallery);
        await builderPage.addElementsInSection('thumbnail_gallery', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'thumbnail-gallery-light');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Select template and add images in 'Thumbnail Gallery'", async() => {
        await mediaElements.selectTemplate('2');
        await mediaElements.uploadImage(selectors.body,'thumbnail-gallery-light', car_second);
        await mediaElements.checkImagesCar(selectors.body,'thumbnail-gallery-light','2');

        await mediaElements.uploadImage(selectors.body,'thumbnail-gallery-light', car_third);
        await mediaElements.checkDots(selectors.body,2);

        await settings.optionsSection('thumbnail','1');
    });

    await test.step("Add 'Overflow Box' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementOverflowBox);
        await builderPage.addOverflowBoxElementInContainer(selectors.body);
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Overflow Box' element settings", async() => {
        await mediaElements.fillOverflowBox('right');
    });

    await test.step("Add 'Icon' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementIcon);
        await builderPage.addElementInEmptySection('icon', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'icon');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Icon' element settings", async() => {
        await settings.sizeSection('0', '0', '50', '50');

        await mediaElements.fillIconData('50', data.Settings.colors.black);
        await mediaElements.chooseIcon('arrow_circle_right', selectors.body);

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Collection Page');
    });

    await test.step("Open 'Collection Page' page", async() => {
        await leftSidebarElements.changePage('Collection Page');
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Thumbnail Gallery' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementThumbnailGallery);
        await builderPage.addElementsInSection('thumbnail_gallery', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'thumbnail-gallery-light');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Select template and add images in 'Thumbnail Gallery'", async() => {
        await mediaElements.selectTemplate('3');

        await mediaElements.uploadImage(selectors.body,'thumbnail-gallery-light', car_third);
        await mediaElements.checkImagesCar(selectors.body,'thumbnail-gallery-light','3');

        await mediaElements.uploadImage(selectors.body,'thumbnail-gallery-light', car_fifth);
        await mediaElements.checkDots(selectors.body,2);

        await settings.optionsSection('thumbnail','1');
    });

    await test.step("Add 'Overflow Box' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementOverflowBox);
        await builderPage.addOverflowBoxElementInContainer(selectors.body);
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Overflow Box' element settings", async() => {
        await mediaElements.fillOverflowBox('bottom_right');
    });

    await test.step("Add 'Icon' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementIcon);
        await builderPage.addElementInEmptySection('icon', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'icon');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Icon' element settings", async() => {
        await settings.sizeSection('0', '0', '50', '50');

        await mediaElements.fillIconData('50', data.Settings.colors.black);
        await mediaElements.chooseIcon('car-8.svg', selectors.body);

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Home');
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check 'Home' page", async() => {
        await mediaElements.clickOnIcon('car-8.svg');
        await mediaElements.checkImagesCar(selectors.body,'thumbnail-gallery-light .thumbnail-gallery__thumbs','2');
        await mediaElements.checkImagesCar(selectors.body,'thumbnail-gallery-light .thumbnail-gallery__thumbs','3');
        await mediaElements.checkImagesCar(selectors.body,'thumbnail-gallery-light .thumbnail-gallery__thumbs','5');
        await mediaElements.clickOnIcon('last_page');
    });

    await test.step("Check 'Collection List' page", async() => {
        await mediaElements.checkDots(selectors.body,2);
        await mediaElements.clickOnIcon('arrow_circle_right');
    });

    await test.step("Check 'Collection Page' page", async() => {
        await mediaElements.checkDots(selectors.body,2);
    });
});