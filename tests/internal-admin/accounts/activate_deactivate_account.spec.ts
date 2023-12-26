import {AccountsPage} from "../../../page-object/internal-admin/accounts";

let    { test, expect        } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { AccountSettingsPage } from "../../../page-object/user-admin/account-settings/accountSettingsPage";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";


let loginLink = Constants.APP_GRID_LOGIN;
let accounts_url = Constants.INTERNAL_ADMIN_ACCOUNTS;
let userAdmin = UserDataHelper.getUser('activate_deactivate_account');
let userInternalAdmin = UserDataHelper.getUser('internal_admin');
let dashboard = require('../../../page-object/data-page.json').InternalAdmin.Dashboard;
let login = require('../../../page-object/data-page.json').InternalAdmin.Login;
let accounts = require('../../../page-object/data-page.json').InternalAdmin.Accounts;
let dashboardUserAdmin = require('../../../page-object/data-page.json').UserAdmin.Dashboard;
let accountId = '127'
let activeStatus = 'Active'
let inactiveStatus = 'Inactive'


test.afterAll(async ({page}) => {
    await page.close();
});

test("Activate / Deactivate account",async ({page}) => {
    let loginPage = new LoginPage(page);
    let universesNav = new UniversesNavPage(page);
    let accountSettingPage = new AccountSettingsPage(page);
    let accountsPage = new AccountsPage(page);

    await test.step("Login to IA admin", async() => {
        await page.goto(loginLink, {waitUntil: "load"});
        await loginPage.login(await userInternalAdmin);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Accounts' page", async() => {
        await universesNav.clickBtn('Accounts');
        await expect(await universesNav.titlePage).toHaveText(accounts.accountsTitle);
        await expect(await page).toHaveURL(accounts_url);
    });

    await test.step("Select account", async() => {
        await accountsPage.searchAccountName(accountId);
        await accountsPage.clickAccountName(accountId);
    });

    await test.step("Deactivate account if activated", async() => {
        await accountsPage.deactivateActivatedAccount(activeStatus, inactiveStatus, accounts.deactivateAccount);
    });

    await test.step("Logout from IA admin", async() => {
        await universesNav.openPage('log_out');
    });

    await test.step("Login to suspended account", async() => {
        await loginPage.login(await userAdmin);
        await expect(await loginPage.errorMessage).toHaveText(login.userWasSuspended);
    });

    await test.step("Login to IA admin", async() => {
        await loginPage.login(await userInternalAdmin);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Accounts' page", async() => {
        await universesNav.clickBtn('Accounts');
        await expect(await universesNav.titlePage).toHaveText(accounts.accountsTitle);
        await expect(await page).toHaveURL(accounts_url);
    });

    await test.step("Select account", async() => {
        await accountsPage.searchAccountName(accountId);
        await accountsPage.clickAccountName(accountId);
    });

    await test.step("Activate account", async() => {
        await accountsPage.clickNameBtn('Activate account');
        await accountSettingPage.checkAlertMessage(accounts.activateAccount);
        await accountsPage.checkStatus('Active', activeStatus);
    });

    await test.step("Logout from IA admin", async() => {
        await universesNav.openPage('log_out');
    });

    await test.step("Login to active account", async() => {
        await loginPage.login(await userAdmin);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboardUserAdmin.dashboardTitle);
    });
});