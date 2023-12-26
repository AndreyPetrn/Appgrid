let    { test, expect        } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { AccountSettingsPage } from "../../../page-object/user-admin/account-settings/accountSettingsPage";
import { AppSettingsPage     } from "../../../page-object/user-admin/settings/app-settings/appSettingsPage";

let appIcon = 'data/images/car-1.jpeg';
let launchIcon = 'data/images/car-2.jpeg';
let loginLink = Constants.APP_GRID_LOGIN;
let settingLink = Constants.USER_APP_SETTINGS;
let user = UserDataHelper.getUser('user_admin');
let appSettings = require('../../../page-object/data-page.json').UserAdmin.AppSettings;
let dashboard = require('../../../page-object/data-page.json').UserAdmin.Dashboard;

test.afterAll(async ({page}) => {
    await page.close();
});

test("App Settings",async ({page}) => {
    let loginPage = new LoginPage(page);
    let universesNav = new UniversesNavPage(page);
    let appSettingsPage = new AppSettingsPage(page);
    let accountSettingPage = new AccountSettingsPage(page);

    await test.step("Login to UI admin", async() => {
        await page.goto(loginLink, {waitUntil: "load"});
        await loginPage.login(await user);
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'App Setting' page", async() => {
        await page.goto(settingLink);
        await expect(await universesNav.titlePage).toHaveText(appSettings.appSettingsTitle);
    });

    await test.step("Delete app icon image", async() => {
        await appSettingsPage.deleteAppImage('App icon', appIcon);
        await accountSettingPage.checkAlertMessage(appSettings.appSettingsSuccessfullyUpdated);
        await appSettingsPage.uploadAppImage('App icon', appIcon);
        await accountSettingPage.checkAlertMessage(appSettings.appSettingsSuccessfullyUpdated);
    });

    await test.step("Delete launch screen image", async() => {
        await appSettingsPage.deleteAppImage('Launch screen', launchIcon);
        await accountSettingPage.checkAlertMessage(appSettings.appSettingsSuccessfullyUpdated);
        await appSettingsPage.uploadAppImage('Launch screen', launchIcon);
        await accountSettingPage.checkAlertMessage(appSettings.appSettingsSuccessfullyUpdated);
    });
});