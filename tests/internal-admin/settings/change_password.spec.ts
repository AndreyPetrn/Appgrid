let    { test, expect        } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { AccountSettingsPage } from "../../../page-object/user-admin/account-settings/accountSettingsPage";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";

let config = require('../../../data/config/config.data.json');
let internalAdminEmail = config.INTERNAL_ADMINS.SECOND_USERNAME;
let loginLink = Constants.INTERNAL_ADMIN_LOGIN;
// let settingsLink = Constants.INTERNAL_ADMIN_SETTINGS;
let user = UserDataHelper.getUser('second_internal_admin');
let setting = require('../../../page-object/data-page.json').InternalAdmin.Settings;
let dashboard = require('../../../page-object/data-page.json').InternalAdmin.Dashboard;
let login = require('../../../page-object/data-page.json').InternalAdmin.Login;

test.afterAll(async ({page}) => {
    await page.close();
});

test("Change password for IA admin",async ({page}) => {
    let loginPage = new LoginPage(page);
    let universesNav = new UniversesNavPage(page);
    let accountSettingPage = new AccountSettingsPage(page);

    await test.step("Login", async() => {
        await page.goto(loginLink, {waitUntil: "load"});
        await loginPage.login(await user);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Settings' page", async() => {
        // await page.goto(settingsLink); // related to https://www.notion.so/Issue-with-IA-redirects-to-404-after-page-reloading-29fac880a5974b8aacc2debe2c098547
        await universesNav.clickBtn('Settings');
        await expect(await universesNav.titlePage).toHaveText(setting.settingsTitle);
    });

    await test.step("Change password", async() => {
        await accountSettingPage.clickBtn('Change password');
        await accountSettingPage.fillPassword(setting.currentPassword, '1');
        await accountSettingPage.fillPassword(setting.newPassword, '2');
        await accountSettingPage.fillPassword(setting.newPassword, '3');
        await accountSettingPage.clickBtn('Update');
        await accountSettingPage.checkAlertMessage(setting.passwordSuccessfullyUpdated);
    });

    await test.step("Logout from IA admin", async() => {
        await universesNav.openPage('log_out');
        await expect(await page).toHaveURL(loginLink);
    });

    await test.step("Login with wrong password", async() => {
        await loginPage.loginWithWrongPassword(internalAdminEmail, setting.currentPassword);
        await expect(await loginPage.errorMessage).toHaveText(login.errorMessage);
    });

    await test.step("Login with new password", async() => {
        await loginPage.fillUserPassword(setting.newPassword);
        await loginPage.clickLogin();
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Settings' page", async() => {
        // await page.goto(settingsLink); // related to https://www.notion.so/Issue-with-IA-redirects-to-404-after-page-reloading-29fac880a5974b8aacc2debe2c098547
        await universesNav.clickBtn('Settings');
        await expect(await universesNav.titlePage).toHaveText(setting.settingsTitle);
    });

    await test.step("Change password back", async() => {
        await accountSettingPage.clickBtn('Change password');
        await accountSettingPage.fillPassword(setting.newPassword, '1');
        await accountSettingPage.fillPassword(setting.currentPassword, '2');
        await accountSettingPage.fillPassword(setting.currentPassword, '3');
        await accountSettingPage.clickBtn('Update');
        await accountSettingPage.checkAlertMessage(setting.passwordSuccessfullyUpdated);
    });

    await test.step("Logout from IA admin", async() => {
        await universesNav.openPage('log_out');
        await expect(await page).toHaveURL(loginLink);
    });

    await test.step("Login", async() => {
        await loginPage.login(await user);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });
});