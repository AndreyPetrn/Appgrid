const  { test                } = require('@playwright/test');
import { Constants           } from "../../../../data/const";
import { Settings            } from "../../../../page-object/themes/settings";
import { BuilderPage         } from "../../../../page-object/themes/builder";
import { SidebarElements     } from "../../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../../page-object/themes/left-sidebar";
import { LayoutElements      } from "../../../../page-object/themes/layout-elements";
import { UniversesNavPage    } from "../../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../../page-object/themes/themes-page";
import selectors from "../../../../page-object/themes/selectors";
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

test("Duplicate/delete element using buttons in builder and layers:", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const layoutElements = new LayoutElements(page);
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
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Duplicate section element using button in builder", async() => {
        await layoutElements.clickOnSection(selectors.body,'0');
        await leftSidebarElements.openSidebar('duplicate');
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 2);
    });

    await test.step("Delete section element using button in builder", async() => {
        await leftSidebarElements.openSidebar('delete_1');
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
    });

    await test.step("Duplicate section element using button in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.duplicateElementInLayers('Section','0');
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 2);
    });

    await test.step("Duplicate section element using button in layers", async() => {
        await settings.deleteElementInLayers('Section','1');
        await builderPage.checkNumberOfElements(selectors.body + ` app-b-empty`, 1);
    });
});