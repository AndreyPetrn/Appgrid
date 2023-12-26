const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import { Settings            } from "../../../page-object/themes/settings";
import { ECommerceElements   } from "../../../page-object/themes/e-commerce-elements";
import selectors from "../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const data = require('../../../page-object/data-page.json').Themes.Builder;

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

test("Check work of wish list elements", async ({page}) => {
    const universesNav = new UniversesNavPage(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const sidebarElements = new SidebarElements(page);
    const leftSidebarElements = new LeftSidebarElements(page);
    const eCommerceElements = new ECommerceElements(page);
    const settings = new Settings(page);

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

    await test.step("Add sections in header", async() => {
        await builderPage.addSectionInContainer(selectors.header);
    });

    await test.step("Add 'Like Button' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementLikeButton);
        await builderPage.addElementsInSection('icon', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'like-button');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Like Button' element settings", async() => {
        await settings.alignmentSection('center');
        await settings.productSettings(data.LamborghiniCountachData.productName);
    });

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Wish List' and 'Wish List Quantity' elements to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementWishList);
        await builderPage.addElementsInSection('wishlist', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'wish-list');
        await builderPage.addElementsInSection('items_count', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'wish-list-quantity');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add sections in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add 'Like Button' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementLikeButton);
        await builderPage.addElementsInSection('icon', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'like-button');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Like Button' element settings", async() => {
        await settings.alignmentSection('center');
        await settings.productSettings(data.VeyronData.productName);
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check number in 'Wish List Quantity' section", async() => {
        await eCommerceElements.checkWishListQuantity(selectors.body,'0');
    });

    await test.step("Add and check product in Wish List", async() => {
        await eCommerceElements.clickOnButton(selectors.header,'like');
        await eCommerceElements.checkWishListQuantity(selectors.body,'1');
        await eCommerceElements.checkContent(selectors.body,'wish-list',1);
        await eCommerceElements.checkProductTitle(selectors.body,'wish-list','0', data.LamborghiniCountachData.productName);
    });

    await test.step("Remove product from Wish List", async() => {
        await eCommerceElements.clickProductIcon(selectors.body,'heart',1);
    });

    await test.step("Check number in 'Wish List Quantity' section", async() => {
        await eCommerceElements.checkWishListQuantity(selectors.body,'0');
    });

    await test.step("Add and check product in Wish List", async() => {
        await eCommerceElements.clickOnButton(selectors.footer,'like');
        await eCommerceElements.checkWishListQuantity(selectors.body,'1');
        await eCommerceElements.checkContent(selectors.body,'wish-list',1);
        await eCommerceElements.checkProductTitle(selectors.body,'wish-list','0', data.VeyronData.productName);
    });

    await test.step("Remove product from Wish List", async() => {
        await eCommerceElements.clickOnButton(selectors.footer,'like');
    });

    await test.step("Check number in 'Wish List Quantity' section", async() => {
        await eCommerceElements.checkWishListQuantity(selectors.body,'0');
    });

    await test.step("Add and check two products in Wish List", async() => {
        await eCommerceElements.clickOnButton(selectors.header,'like');
        await eCommerceElements.clickOnButton(selectors.footer,'like');
        await eCommerceElements.checkWishListQuantity(selectors.body,'2');
        await eCommerceElements.checkProductTitle(selectors.body,'wish-list','0', data.LamborghiniCountachData.productName);
        await eCommerceElements.checkProductTitle(selectors.body,'wish-list','2', data.VeyronData.productName);
    });
});