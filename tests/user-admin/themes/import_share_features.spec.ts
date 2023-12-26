let    { test, expect        } = require('@playwright/test');
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { AccountSettingsPage } from "../../../page-object/user-admin/account-settings/accountSettingsPage";

let loginLink = Constants.APP_GRID_LOGIN;
let themesLink = Constants.USER_ADMIN_THEMES;
let themes = require('../../../page-object/data-page.json').UserAdmin.Themes;
let dashboard = require('../../../page-object/data-page.json').UserAdmin.Dashboard;
let user = UserDataHelper.getUser('user_admin');
let secondUser = UserDataHelper.getUser('second_user_admin');
let key;

test.afterAll(async ({page}) => {
    await page.close();
});

test("Can share themes for another store", async ({page}) => {
    let loginPage          = new LoginPage(page);
    let universesNav       = new UniversesNavPage(page);
    let themesPage         = new ThemesPage(page);
    let accountSettingPage = new AccountSettingsPage(page);

    await test.step("Login to second store Appgrid", async () => {
        await page.goto(loginLink, {waitUntil: "load"});
        await loginPage.login(await secondUser);
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Themes' page and delete all themes", async () => {
        await page.goto(themesLink);
        await themesPage.deleteThemes();
    });

    await test.step("Logout from UI admin", async() => {
        await loginPage.logoutUserAdmin();
        await expect(await page).toHaveURL(loginLink);
    });

    await test.step("Login to Appgrid", async() => {
        await loginPage.login(await user);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Themes' page", async() => {
        await page.goto(themesLink);
        await expect(await universesNav.titlePage).toHaveText(themes.title);
    });

    await test.step("Share theme", async() => {
        await expect(await universesNav.titlePage).toHaveText(themes.title);
        await themesPage.themeSettings('share', '0');
        await themesPage.key.getAttribute('data-theme-key').then(function (value) {
            key = value;
        });
        await universesNav.clickBtn('Copy')
        await accountSettingPage.checkAlertMessage(themes.themeKeyCopied);
    });

    await test.step("Logout from UI admin", async() => {
        await loginPage.logoutUserAdmin();
        await expect(await page).toHaveURL(loginLink);
    });

    await test.step("Login to second store Appgrid", async() => {
        await loginPage.login(await secondUser);
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Themes' page", async() => {
        await page.goto(themesLink);
        await expect(await universesNav.titlePage).toHaveText(themes.title);
    });

    await test.step("Check themes library", async() => {
        await expect(await themesPage.themeInLibraryText).toHaveText(themes.have0OtherThemes);
    });

    await test.step("Import theme", async() => {
        await universesNav.clickNameBtnText('Import theme');
        await themesPage.fillThemeKey(key);
        await accountSettingPage.checkAlertMessage(themes.themeImported);
        await expect(await themesPage.themeInLibraryText).toHaveText(themes.have1OtherThemes);
    });
});