let    { test, expect        } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { AccountSettingsPage } from "../../../page-object/user-admin/account-settings/accountSettingsPage";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { InternalThemesPage  } from "../../../page-object/internal-admin/themes";
import faker from "@faker-js/faker";

let loginLink = Constants.INTERNAL_ADMIN_LOGIN;
// let themesLink = Constants.INTERNAL_ADMIN_THEMES;
let user = UserDataHelper.getUser('internal_admin');
let themes = require('../../../page-object/data-page.json').InternalAdmin.Themes;
let dashboard = require('../../../page-object/data-page.json').InternalAdmin.Dashboard;
let themeName = `Theme_name_${faker.random.alphaNumeric(4)}`;
let themeNameNew = `Name_new_${faker.random.alphaNumeric(2)}`;
let image = 'data/images/car-3.png';
let appName = 'Dmitry Store';
let tag = 'Test tag';
let newTag = 'New tag';

test.afterAll(async ({page}) => {
    await page.close();
});

test("Can add, edit and delete theme",async ({page}) => {
    let loginPage = new LoginPage(page);
    let universesNav = new UniversesNavPage(page);
    let accountSettingPage = new AccountSettingsPage(page);
    let internalThemePage = new InternalThemesPage(page);

    await test.step("Login to IA admin", async() => {
        await page.goto(loginLink, {waitUntil: "load"});
        await loginPage.login(await user);
        await universesNav.waitSidebar();
        await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    });

    await test.step("Go to 'Themes' page", async() => {
        // await page.goto(themesLink);
        await universesNav.clickBtn('Themes');
        await expect(await universesNav.titlePage).toHaveText(themes.themesTitle);
    });

    await test.step("Click 'Add theme' button", async() => {
        await universesNav.clickBtn('Add theme');
        await expect(await internalThemePage.addThemeModalTitle).toHaveText(themes.addThemesModalTitle);
    });

    await test.step("Create a new theme", async() => {
        await internalThemePage.fillThemeName(themeName);
        await internalThemePage.clickType('Public');
        await internalThemePage.fillTag(tag);
        await internalThemePage.fillThemeUrl(themes.storeUrl);
        await internalThemePage.uploadThumbnailImage(image);
        await universesNav.clickBtn('Upload');
        await page.waitForTimeout(1000);
        await accountSettingPage.checkAlertMessage(themes.themesAdded);
    });

    await test.step("Check info created theme", async() => {
        await internalThemePage.checkInfoFromColumn(1, 2, themeName);
        await internalThemePage.checkInfoFromColumn(1, 4, 'Public');
        await internalThemePage.checkInfoFromColumn(1, 5, 'All apps');
        await internalThemePage.checkInfoFromColumn(1, 6, tag);
    });

    await test.step("Edit theme", async() => {
        await internalThemePage.clickBtnTable(1, 'Edit');
        await internalThemePage.fillThemeName(themeNameNew);
        await internalThemePage.clickType('Private');
        await internalThemePage.selectApps(appName);
        await internalThemePage.fillTag(newTag);
        await internalThemePage.fillThemeUrl(themes.storeUrl);
        await universesNav.clickBtn('Update');
        await accountSettingPage.checkAlertMessage(themes.themeEdited);
    });

    await test.step("Check info theme", async() => {
        await internalThemePage.checkInfoFromColumn(1, 2, themeNameNew);
        await internalThemePage.checkInfoFromColumn(1, 4, 'Private');
        await internalThemePage.checkInfoFromColumn(1, 5, appName);
        await internalThemePage.checkInfoFromColumn(1, 6, newTag);
    });

    await test.step("Delete theme", async() => {
        await internalThemePage.clickBtnTable(1, 'Delete');
        await internalThemePage.clickType('No');
        await internalThemePage.checkInfoFromColumn(1, 2, themeNameNew);
        await internalThemePage.clickBtnTable(1, 'Delete');
        await internalThemePage.clickType('Yes');
        await accountSettingPage.checkAlertMessage(themes.themeDeleted);
    });
});