let    { test, expect        } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { AccountSettingsPage } from "../../../page-object/user-admin/account-settings/accountSettingsPage";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";

let config = require('../../../data/config/config.data.json');
let userAdminEmail = config.CHANGE_PASSWORD_UI.ADMIN.USERNAME;
let loginLink = Constants.APP_GRID_LOGIN;
let accountSettingLink = Constants.USER_ADMIN_SETTINGS;
let user = UserDataHelper.getUser('change_password_user_admin');
let accountSettings = require('../../../page-object/data-page.json').UserAdmin.AccountSettings;
let dashboard = require('../../../page-object/data-page.json').UserAdmin.Dashboard;
let login = require('../../../page-object/data-page.json').UserAdmin.Login;

test.afterAll(async ({page}) => {
    await page.close();
});

test("Change password",async ({page}) => {
    let loginPage = new LoginPage(page);
    let universesNav = new UniversesNavPage(page);
    let accountSettingPage = new AccountSettingsPage(page);

    await test.step("Login", async() => {
        await page.goto(loginLink, {waitUntil: "load"});
        await loginPage.login(await user);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Account Setting' page", async() => {
        await page.goto(accountSettingLink);
        await expect(await universesNav.titlePage).toHaveText(accountSettings.accountSettingsTittle);
    });

    await test.step("Change password", async() => {
        await accountSettingPage.clickBtn('Change password');
        await accountSettingPage.fillPassword(accountSettings.currentPassword, '8');
        await accountSettingPage.fillPassword(accountSettings.newPassword, '9');
        await accountSettingPage.fillPassword(accountSettings.newPassword, '10');
        await accountSettingPage.clickBtn('Update');
        await accountSettingPage.checkAlertMessage(accountSettings.passwordSuccessfullyUpdated);
    });

    await test.step("Logout from UI admin", async() => {
        await loginPage.logoutUserAdmin();
        await expect(await page).toHaveURL(loginLink);
    });

    await test.step("Login with wrong password", async() => {
        await loginPage.loginWithWrongPassword(userAdminEmail, accountSettings.currentPassword);
        await expect(await loginPage.errorMessage).toHaveText(login.errorMessage);
    });

    await test.step("Login with new password", async() => {
        await loginPage.fillUserPassword(accountSettings.newPassword);
        await loginPage.clickLogin();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Account Setting' page", async() => {
        await page.goto(accountSettingLink);
        await expect(await universesNav.titlePage).toHaveText(accountSettings.accountSettingsTittle);
    });

    await test.step("Change password back", async() => {
        await accountSettingPage.clickBtn('Change password');
        await accountSettingPage.fillPassword(accountSettings.newPassword, '8');
        await accountSettingPage.fillPassword(accountSettings.currentPassword, '9');
        await accountSettingPage.fillPassword(accountSettings.currentPassword, '10');
        await accountSettingPage.clickBtn('Update');
        await accountSettingPage.checkAlertMessage(accountSettings.passwordSuccessfullyUpdated);
    });

    await test.step("Logout from UI admin", async() => {
        await loginPage.logoutUserAdmin();
        await expect(await page).toHaveURL(loginLink);
    });

    await test.step("Login", async() => {
        await loginPage.login(await user);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });
});