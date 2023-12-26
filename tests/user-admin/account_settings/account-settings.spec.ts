let    { test, expect        } = require('@playwright/test');
import { faker               } from "@faker-js/faker";
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { AccountSettingsPage } from "../../../page-object/user-admin/account-settings/accountSettingsPage";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";

let loginLink = Constants.APP_GRID_LOGIN;
let accountSettingLink = Constants.USER_ADMIN_SETTINGS;
let accountSettings = require('../../../page-object/data-page.json').UserAdmin.AccountSettings;
let dashboard = require('../../../page-object/data-page.json').UserAdmin.Dashboard;
let user = UserDataHelper.getUser('user_admin');
let image = 'data/images/car-3.png';
let name = `Name ${faker.name.lastName()}`;
let city = `City ${faker.random.alphaNumeric(4)}`;
let street = `Street ${faker.random.alphaNumeric(4)}`;
let suite = `Suite ${faker.random.alphaNumeric(4)}`;
let state = `State ${faker.random.alphaNumeric(4)}`;
let country = `1${Math.floor(Math.random() * 20)}`;
let phoneNumber = `${faker.phone.phoneNumberFormat()}`;
let zip = `Zip ${faker.random.alphaNumeric(4)}`;

test.afterAll(async ({page}) => {
    await page.close();
});

test("Account Settings General", async ({page}) => {
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

    await test.step("Delete image", async() => {
        await accountSettingPage.deleteImage(image);
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
        await accountSettingPage.uploadImage(image);
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Fill full name field", async() => {
        await accountSettingPage.fillInputField(name, '1');
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Select country", async() => {
        await accountSettingPage.selectCountry(country);
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Fill city field", async() => {
        await accountSettingPage.fillInputField(city, '2');
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Fill phone field", async() => {
        await accountSettingPage.fillInputField(phoneNumber, '3');
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Fill street field", async() => {
        await accountSettingPage.fillInputField(street, '4');
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Fill suite field", async() => {
        await accountSettingPage.fillInputField(suite, '5');
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Fill state field", async() => {
        await accountSettingPage.fillInputField(state, '6');
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Fill zip field", async() => {
        await accountSettingPage.fillInputField(zip, '7');
        await accountSettingPage.checkAlertMessage(accountSettings.accountSuccessfullyUpdated);
    });

    await test.step("Logout from UI admin", async() => {
        await loginPage.logoutUserAdmin();
        await expect(await page).toHaveURL(loginLink);
    });
});