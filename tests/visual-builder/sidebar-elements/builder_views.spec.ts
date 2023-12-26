const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import selectors from "../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const data = require('../../../page-object/data-page.json').Themes.Builder;
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const infiniteCanvas = 'infinite-canvas.png';
const iphoneSE = 'iphone-se.png';
const iphone13Mini = 'iphone-13-mini.png';
const iphone8 = 'iphone-8.png';
const iphone8Plus = 'iphone-8+.png';
const iphone13 = 'iphone-13.png';
const iphone11ProMax = 'iphone-11-pro-max.png';
const iphone13ProMax = 'iphone13-pro-max.png';

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

test("Check builder views", async ({page}) => {
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const universesNav = new UniversesNavPage(page);
    const sidebarElements = new SidebarElements(page);

    await test.step("Open themes page", async() => {
        await universesNav.openPage('image');
    });

    await test.step("Delete old themes and create new", async() => {
        await themesPage.deleteThemes();
        await themesPage.createTheme(themeName,'brush','1');
    });

    await test.step("Check views", async() => {
        await sidebarElements.openViews();

        await sidebarElements.checkViews(data.Views.Device.Default, data.Views.PX.InfiniteCanvas);

        await sidebarElements.checkViews(data.Views.Device.iPhoneSE, data.Views.PX.iPhoneSE);

        await sidebarElements.checkViews(data.Views.Device.iPhone13Mini, data.Views.PX.iPhone13Mini);
        await sidebarElements.checkViews(data.Views.Device.iPhone13Mini, data.Views.SimilarDevice.iPhone13Mini);

        await sidebarElements.checkViews(data.Views.Device.iPhone8, data.Views.PX.iPhone8);
        await sidebarElements.checkViews(data.Views.Device.iPhone8, data.Views.SimilarDevice.iPhone8);

        await sidebarElements.checkViews(data.Views.Device.iPhone8Plus, data.Views.PX.iPhone8Plus);
        await sidebarElements.checkViews(data.Views.Device.iPhone8Plus, data.Views.SimilarDevice.iPhone8Plus);

        await sidebarElements.checkViews(data.Views.Device.iPhone11ProMax, data.Views.PX.iPhone11ProMax);
        await sidebarElements.checkViews(data.Views.Device.iPhone11ProMax, data.Views.SimilarDevice.iPhone11ProMax);

        await sidebarElements.checkViews(data.Views.Device.iPhone13ProMax, data.Views.PX.iPhone13ProMax);
        await sidebarElements.checkViews(data.Views.Device.iPhone13ProMax, data.Views.SimilarDevice.iPhone13ProMax);

        await sidebarElements.clickOnDevise(data.Views.Device.Default);
    });

    await test.step("Make sure that 'Infinite Canvas' is displayed", async() => {
        await builderPage.checkScreenshot(selectors.waitForBuilderToLoad, selectors.builder, infiniteCanvas);
    });

    await test.step("Choose 'iPhone SE 1st Gen' devise", async() => {
        await sidebarElements.chooseDevise(data.Views.Device.iPhoneSE);
    });

    await test.step("Make sure that 'iPhone SE 1st Gen' is displayed", async() => {
        await builderPage.checkScreenshot(selectors.waitForBuilderToLoad, selectors.builder, iphoneSE);
    });

    await test.step("Choose 'iPhone 13 mini' devise", async() => {
        await sidebarElements.chooseDevise(data.Views.Device.iPhone13Mini);
    });

    await test.step("Make sure that 'iPhone 13 mini' is displayed", async() => {
        await builderPage.checkScreenshot(selectors.waitForBuilderToLoad, selectors.builder, iphone13Mini);
    });

    await test.step("Choose 'iPhone 8' devise", async() => {
        await sidebarElements.chooseDevise('iPhone 8');
    });

    await test.step("Make sure that 'iPhone 8' is displayed", async() => {
        await builderPage.checkScreenshot(selectors.waitForBuilderToLoad, selectors.builder, iphone8);
    });

    await test.step("Choose 'iPhone 8+' devise", async() => {
        await sidebarElements.chooseDevise(data.Views.Device.iPhone8Plus);
    });

    await test.step("Make sure that 'iPhone 8+' is displayed", async() => {
        await builderPage.checkScreenshot(selectors.waitForBuilderToLoad, selectors.builder, iphone8Plus);
    });

    await test.step("Choose 'iPhone 13' devise", async() => {
        await sidebarElements.chooseDevise(data.Views.Device.iPhone13);
    });

    await test.step("Make sure that 'iPhone 13' is displayed", async() => {
        await builderPage.checkScreenshot(selectors.waitForBuilderToLoad, selectors.builder, iphone13);
    });

    await test.step("Choose 'iPhone 11 Pro Max' devise", async() => {
        await sidebarElements.chooseDevise(data.Views.Device.iPhone11ProMax);
    });

    await test.step("Make sure that 'iPhone 11 Pro Max' is displayed", async() => {
        await builderPage.checkScreenshot(selectors.waitForBuilderToLoad, selectors.builder, iphone11ProMax);
    });

    await test.step("Choose 'iPhone 13 Pro Max' devise", async() => {
        await sidebarElements.chooseDevise(data.Views.Device.iPhone13ProMax);
    });

    await test.step("Make sure that 'iPhone 13 Pro Max' is displayed", async() => {
        await builderPage.checkScreenshot(selectors.waitForBuilderToLoad, selectors.builder, iphone13ProMax);
    });
});