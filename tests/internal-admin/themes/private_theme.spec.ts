let    { test, expect        } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { AccountSettingsPage } from "../../../page-object/user-admin/account-settings/accountSettingsPage";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { InternalThemesPage  } from "../../../page-object/internal-admin/themes";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import faker from "@faker-js/faker";

let adminLoginLink = Constants.INTERNAL_ADMIN_LOGIN;
let userLoginLink = Constants.APP_GRID_LOGIN;
let themesUserLink = Constants.USER_ADMIN_THEMES;
let userAdmin = UserDataHelper.getUser('user_privat_theme');
let secondUserAdmin = UserDataHelper.getUser('second_user_admin');
let user = UserDataHelper.getUser('internal_admin');
let themes = require('../../../page-object/data-page.json').InternalAdmin.Themes;
let themesUserAdmin = require('../../../page-object/data-page.json').UserAdmin.Themes;
let dashboard = require('../../../page-object/data-page.json').InternalAdmin.Dashboard;
let dashboardUserAdmin = require('../../../page-object/data-page.json').UserAdmin.Dashboard;
let themeName = `Theme_name_${faker.random.alphaNumeric(4)}`;
let image = 'data/images/car-3.png';
let appName = 'Dmitry Store';
let tag = 'Test tag';

test.afterAll(async ({page}) => {
    await page.close();
});

test("Private theme for store",async ({page}) => {
    let loginPage = new LoginPage(page);
    let universesNav = new UniversesNavPage(page);
    let accountSettingPage = new AccountSettingsPage(page);
    let internalThemePage = new InternalThemesPage(page);
    let themesPage = new ThemesPage(page);

    await test.step("Login to IA admin", async() => {
        await page.goto(adminLoginLink, {waitUntil: "load"});
        await loginPage.login(await user);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Themes' page", async() => {
        await universesNav.clickBtn('Themes');
        await expect(await universesNav.titlePage).toHaveText(themes.themesTitle);
    });

    await test.step("Click the 'Add theme' button", async() => {
        await universesNav.clickBtn('Add theme');
        await expect(await internalThemePage.addThemeModalTitle).toHaveText(themes.addThemesModalTitle);
    });

    await test.step("Create a new theme", async() => {
        await internalThemePage.fillThemeName(themeName);
        await internalThemePage.clickType('Private');
        await internalThemePage.selectApps(appName);
        await internalThemePage.fillTag(tag);
        await internalThemePage.fillThemeUrl(themes.storeUrl);
        await internalThemePage.uploadThumbnailImage(image);
        await universesNav.clickBtn('Upload');
        await page.waitForTimeout(500);
        await accountSettingPage.checkAlertMessage(themes.themesAdded);
    });

    await test.step("Check info created theme", async() => {
        await internalThemePage.checkInfoFromColumn(1, 2, themeName);
        await internalThemePage.checkInfoFromColumn(1, 4, 'Private');
        await internalThemePage.checkInfoFromColumn(1, 5, appName);
        await internalThemePage.checkInfoFromColumn(1, 6, tag);
    });

    await test.step("Logout from IA admin", async() => {
        await universesNav.openPage('log_out');
        await expect(await page).toHaveURL(adminLoginLink);
    });

    await test.step("Login to user admin and check private theme", async() => {
        await page.goto(userLoginLink, {waitUntil: "load"});
        await loginPage.login(await userAdmin);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboardUserAdmin.dashboardTitle);
    });

    await test.step("Go to 'Themes' page", async () => {
        await page.goto(themesUserLink);
        await expect(await universesNav.titlePage).toHaveText(themesUserAdmin.title);
    });

    await test.step("Click the 'Themes store' button", async() => {
        await universesNav.clickNameBtnText('Theme store');
        await expect(await universesNav.titlePage).toHaveText(themesUserAdmin.titleThemesStore);
    });

    await test.step("Click the 'Add' button", async() => {
        await themesPage.addTheme(themeName);
        await accountSettingPage.checkAlertMessage(themesUserAdmin.themesAdded);
    });

    await test.step("Click the 'Back' button and check private theme", async() => {
        await universesNav.clickBtn('Back');
        await expect(await universesNav.titlePage).toHaveText(themesUserAdmin.title);
        await page.isVisible(`//span[contains(., '${themeName}')]`);
    });

    await test.step("Logout from UI admin", async() => {
        await loginPage.logoutUserAdmin();
        await expect(await page).toHaveURL(userLoginLink);
    });

    await test.step("Login to user admin and check private theme is not visible", async() => {
        await page.goto(userLoginLink, {waitUntil: "load"});
        await loginPage.login(await secondUserAdmin);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboardUserAdmin.dashboardTitle);
    });

    await test.step("Go to 'Themes' page", async () => {
        await page.goto(themesUserLink);
        await expect(await universesNav.titlePage).toHaveText(themesUserAdmin.title);
    });

    await test.step("Click the 'Themes store' button", async() => {
        await universesNav.clickNameBtnText('Theme store');
        await expect(await universesNav.titlePage).toHaveText(themesUserAdmin.titleThemesStore);
        await page.isHidden(`//span[contains(., '${themeName}')]`);
    });

    await test.step("Logout from UI admin", async() => {
        await loginPage.logoutUserAdmin();
        await expect(await page).toHaveURL(userLoginLink);
    });

    await test.step("Login to IA admin", async() => {
        await page.goto(adminLoginLink, {waitUntil: "load"});
        await loginPage.login(await user);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Themes' page", async() => {
        // await page.goto(themesLink); related to https://www.notion.so/Issue-with-IA-redirects-to-404-after-page-reloading-29fac880a5974b8aacc2debe2c098547
        await universesNav.clickBtn('Themes');
        await expect(await universesNav.titlePage).toHaveText(themes.themesTitle);
    });

    await test.step("Delete created theme", async() => {
        await internalThemePage.clickBtnTable(1, 'Delete');
        await internalThemePage.clickType('Yes');
        await accountSettingPage.checkAlertMessage(themes.themeDeleted);
    });
});