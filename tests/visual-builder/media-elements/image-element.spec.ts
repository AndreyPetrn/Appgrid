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
const car_first = 'data/images/car-1.jpeg';
const car_fourth = 'data/images/car-4.png';
const car_sixth = 'data/images/car-6.gif';
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

test("Check work of image element", async ({page}) => {
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

    await test.step("Add and configure sections in header", async() => {
        await builderPage.addSectionInContainer(selectors.header);
        await settings.alignmentSection('center');
        await settings.sizeSection('0','','50','50');
    });

    await test.step("Add 'Code Snippet' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCodeSnippet);
        await builderPage.addElementsInSection('code', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'code-snippet');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Code Snippet' element settings", async() => {
        await mediaElements.fillCode();
        await mediaElements.checkCode();
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Image' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementsInSection('image', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Upload image(GIF) and element settings", async() => {
        await settings.sizeSection('1','1','100','100');

        await mediaElements.uploadImage(selectors.body,'image', car_sixth);
        await mediaElements.checkImagesCar(selectors.body,'image','6');

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Collection List');

        await settings.openSection('Border', 1);
        await settings.borderSection('5', data.Settings.colors.red);

        await settings.openSection('Corner radius', 1);
        await settings.cornerRadiusSection('0', '30');
    });

    await test.step("Add sections in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add 'Content Dropdown' element to section (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementContentDropdown);
        await builderPage.addElementsInSection('dropdown', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'content-menu-dropdown');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Content Dropdown' element settings", async() => {
        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.red);
        await settings.borderSection('5', data.Settings.colors.blue);
        await settings.openSection('Corner radius', 1);
        await settings.cornerRadiusSection('0', '10');
    });

    await test.step("Add 'image' element to 'Content Dropdown' (footer)", async() => {
        await mediaElements.openContentMenuDropdown(selectors.footer, 2);
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementInEmptySection('image', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Upload image(JPEG) and element settings", async() => {
        await settings.sizeSection('1','1','100','100');

        await mediaElements.uploadImage(selectors.footer,'image', car_first);
        await mediaElements.checkImagesCar(selectors.footer,'image','1');

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Home');

        await settings.openSection('Border', 1);
        await settings.borderSection('5', data.Settings.colors.blue);

        await settings.openSection('Corner radius', 1);
        await settings.cornerRadiusSection('1', '3');
        await mediaElements.closeContentMenuDropdown(selectors.footer, 2);
    });

    await test.step("Open 'Collection List' page", async() => {
        await leftSidebarElements.changePage('Collection List');
    });

    await test.step("Check elements in header and footer sections (Collection List)", async() => {
        await mediaElements.checkCode();
        await mediaElements.openContentMenuDropdown(selectors.footer, 2);
        await mediaElements.checkImagesCar(selectors.footer,'image','1');
        await mediaElements.closeContentMenuDropdown(selectors.footer, 2);
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Image' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementsInSection('image', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Upload image(PNG) and element settings", async() => {
        await settings.sizeSection('1','1','100','100');

        await mediaElements.uploadImage(selectors.body,'image', car_fourth);
        await mediaElements.checkImagesCar(selectors.body,'image','4');

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Collection Page');
    });

    await test.step("Open 'Collection Page' page", async() => {
        await leftSidebarElements.changePage('Collection Page');
    });

    await test.step("Check elements in header and footer sections (Collection Page)", async() => {
        await mediaElements.checkCode();
        await mediaElements.openContentMenuDropdown(selectors.footer, 2);
        await mediaElements.checkImagesCar(selectors.footer,'image','1');
        await mediaElements.closeContentMenuDropdown(selectors.footer, 2);
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Image' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementsInSection('image', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Upload image(SVG) and element settings", async() => {
        await settings.sizeSection('1','1','100','100');

        await mediaElements.uploadImage(selectors.body,'image', car_seventh);
        await mediaElements.checkImagesCar(selectors.body,'image','7');

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Product Page');
        await page.waitForTimeout(1000);
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check 'Collection Page' page", async() => {
        await mediaElements.checkCode();
        await mediaElements.openContentMenuDropdown(selectors.footer, 1);
        await mediaElements.checkImagesCar(selectors.footer,'image','1');
        await mediaElements.clickOnImage(selectors.footer,'image','1');
    });

    await test.step("Check 'Home' page", async() => {
        await mediaElements.checkCode();
        await mediaElements.checkImagesCar(selectors.footer,'image','1');
        await mediaElements.closeContentMenuDropdown(selectors.footer, 1);
        await mediaElements.checkImagesCar(selectors.body,'image','6');
        await mediaElements.clickOnImage(selectors.body,'image','6');
    });

    await test.step("Check 'Collection List' page", async() => {
        await mediaElements.checkCode();
        await mediaElements.openContentMenuDropdown(selectors.footer, 1);
        await mediaElements.checkImagesCar(selectors.footer,'image','1');
        await mediaElements.closeContentMenuDropdown(selectors.footer, 1);
        await mediaElements.checkImagesCar(selectors.body,'image','4');
        await mediaElements.clickOnImage(selectors.body,'image','4');
    });

    await test.step("Check 'Collection Page' page", async() => {
        await mediaElements.checkCode();
        await mediaElements.openContentMenuDropdown(selectors.footer, 1);
        await mediaElements.checkImagesCar(selectors.footer,'image','1');
        await mediaElements.closeContentMenuDropdown(selectors.footer, 1);
        await mediaElements.checkImagesCar(selectors.body,'image','7');
        await mediaElements.clickOnImage(selectors.body,'image','7');
    });

    await test.step("Check 'Product Page' page", async() => {
        await mediaElements.checkCode();
        await mediaElements.openContentMenuDropdown(selectors.footer, 1);
        await mediaElements.checkImagesCar(selectors.footer,'image','1');
        await mediaElements.closeContentMenuDropdown(selectors.footer, 1);
    });
});