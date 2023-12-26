const  { expect, test      } = require('@playwright/test');
import { Constants         } from "../../data/const";
import { UserDataHelper    } from "../../helpers/data-helpers/user.data.helper";
import { LoginPage         } from "../../page-object/login/loginPage";
import { UniversesNavPage  } from "../../page-object/universes-nav/universes-nav";

let login = Constants.INTERNAL_ADMIN_LOGIN;
let dashboard_url = Constants.INTERNAL_ADMIN_DASHBOARD;
let accounts_url = Constants.INTERNAL_ADMIN_ACCOUNTS;
let internal_users_url = Constants.INTERNAL_ADMIN_USERS;
let plans_url = Constants.INTERNAL_ADMIN_PLANS;
let themes_url = Constants.INTERNAL_ADMIN_THEMES;
let settings_url = Constants.INTERNAL_ADMIN_SETTINGS;
let dashboard = require('../../page-object/data-page.json').InternalAdmin.Dashboard;
let accounts = require('../../page-object/data-page.json').InternalAdmin.Accounts;
let internalUsers = require('../../page-object/data-page.json').InternalAdmin.InternalUsers;
let plans = require('../../page-object/data-page.json').InternalAdmin.Plans;
let settings = require('../../page-object/data-page.json').InternalAdmin.Settings;
let themes = require('../../page-object/data-page.json').InternalAdmin.Themes;
let user = UserDataHelper.getUser('internal_admin');

test.afterAll(async ({page}) => {
  await page.close();
});

test("Checking pages on IA admin", async ({page}) => {
  let loginPage = new LoginPage(page);
  let universesNav = new UniversesNavPage(page);

  await test.step("Login and check dashboard page", async() => {
    await page.goto(login, {waitUntil: "load"});
    await loginPage.login(await user);
    await universesNav.waitSidebar();
    await expect(await universesNav.titlePage).toHaveText(dashboard.dashboardTitle);
    await expect(await page).toHaveURL(dashboard_url);
  });

  await test.step("Check account page", async() => {
    await universesNav.clickBtn('Accounts');
    await expect(await universesNav.titlePage).toHaveText(accounts.accountsTitle);
    await expect(await page).toHaveURL(accounts_url);
  });

  await test.step("Check internal user page", async() => {
    await universesNav.clickBtn('Internal users');
    await expect(await universesNav.titlePage).toHaveText(internalUsers.internalUsersTitle);
    await expect(await page).toHaveURL(internal_users_url);
  });

  await test.step("Check plans page", async() => {
    await universesNav.clickBtn('Plans');
    await expect(await universesNav.titlePage).toHaveText(plans.plansTitle);
    await expect(await page).toHaveURL(plans_url);
  });

  await test.step("Check themes page", async() => {
    await universesNav.clickBtn('Themes');
    await expect(await universesNav.titlePage).toHaveText(themes.themesTitle);
    await expect(await page).toHaveURL(themes_url);
  });

  await test.step("Check settings page", async() => {
    await universesNav.clickBtn('Settings');
    await expect(await universesNav.titlePage).toHaveText(settings.settingsTitle);
    await expect(await page).toHaveURL(settings_url);
  });
});
  
