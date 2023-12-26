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
import selectors from "../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('second_user_builder');
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const data = require('../../../page-object/data-page.json').Themes.Builder;
const car_first = 'data/images/car-1.jpeg';
const car_fourth = 'data/images/car-4.png';
const car_sixth = 'data/images/car-6.gif';

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

test("Upload images in assets", async ({page}) => {
    const universesNav = new UniversesNavPage(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const mediaElements = new MediaElements(page);
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

    await test.step("Add section in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Remove all images from assets if need", async() => {
        await leftSidebarElements.openSidebar('assets');
        await leftSidebarElements.deleteAllAssets();
    });

    await test.step("Upload image jpg, png, gif", async() => {
        await leftSidebarElements.uploadImage(car_first);
        await leftSidebarElements.checkUploadedImage('1');
        await leftSidebarElements.uploadImage(car_fourth);
        await leftSidebarElements.checkUploadedImage('4');
        await leftSidebarElements.uploadImage(car_sixth);
        await leftSidebarElements.checkUploadedImage('6');
        await leftSidebarElements.openSidebar('add');
    });

    await test.step("Add 'Image' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementsInSection('image', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Select jpg images in assets", async() => {
        await mediaElements.selectImage('1');
        await mediaElements.checkImagesCar(selectors.body,'image','1');
    });

    await test.step("Select png images in assets", async() => {
        await mediaElements.selectImage('4');
        await mediaElements.checkImagesCar(selectors.body,'image','4');
    });

    await test.step("Select gif images in assets", async() => {
        await mediaElements.selectImage('6');
        await mediaElements.checkImagesCar(selectors.body,'image','6');
    });

    await test.step("Zoom and check images", async() => {
        await leftSidebarElements.openSidebar('assets');
        await leftSidebarElements.zoomImage();
        await leftSidebarElements.checkPopup('6');
        await leftSidebarElements.openSidebar('arrow_right_1');
        await leftSidebarElements.checkPopup('4');
        await leftSidebarElements.openSidebar('arrow_right_1');
        await leftSidebarElements.checkPopup('1');
        await leftSidebarElements.openSidebar('cross');
    });

    await test.step("Remove all images from assets", async() => {
        await leftSidebarElements.deleteAllAssets();
    });
});