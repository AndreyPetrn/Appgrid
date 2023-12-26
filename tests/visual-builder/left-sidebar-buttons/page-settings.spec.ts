const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { Settings            } from "../../../page-object/themes/settings";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
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

test("Page settings: rename page and delete header/footer", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
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

    await test.step("Updated page title", async() => {
        await leftSidebarElements.openSidebar('page_settings');
        await settings.updatePageTitle('Page Title');
        await settings.checkPageTitle('Page Title')
    });

    await test.step("Delete header", async() => {
        await settings.pageSettings(1,0);
        await settings.headerIsHidden();
    });

    await test.step("Delete footer", async() => {
        await settings.pageSettings(1,1);
        await settings.footerIsHidden();
    });

    await test.step("Delete footer and header", async() => {
        await settings.pageSettings(0,1);
        await settings.footerIsHidden();
        await settings.headerIsHidden();
    });
});