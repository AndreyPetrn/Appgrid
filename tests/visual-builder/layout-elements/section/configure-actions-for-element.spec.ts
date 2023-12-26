const  { test                } = require('@playwright/test');
import { Constants           } from "../../../../data/const";
import { LayoutElements            } from "../../../../page-object/themes/layout-elements";
import { Settings            } from "../../../../page-object/themes/settings";
import { BuilderPage         } from "../../../../page-object/themes/builder";
import { SidebarElements     } from "../../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../../page-object/themes/left-sidebar";
import { ECommerceElements   } from "../../../../page-object/themes/e-commerce-elements";
import { UniversesNavPage    } from "../../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../../page-object/themes/themes-page";
import selectors from "../../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
// const keyboard = require('../../../../page-object/data-page.json').Themes.Builder; // local
const keyboard = require('../../../../page-object/data-page.json').Themes.Builder.Remote; // remote
const data = require('../../../../page-object/data-page.json').Themes.Builder;
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;

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

test("'Actions' settings for section:", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const layoutElements = new LayoutElements(page);
    const universesNav = new UniversesNavPage(page);
    const sidebarElements = new SidebarElements(page);
    const eCommerceElements = new ECommerceElements(page);
    const leftSidebarElements = new LeftSidebarElements(page);

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

    await test.step("Add section in header", async() => {
        await builderPage.addSectionInContainer(selectors.header);
    });

    await test.step("Actions - 'Go back' settings", async() => {
        await settings.openSection('Actions', 1);
        await settings.selectActions('Go back','');
    });

    await test.step("'Section' element settings", async() => {
        await settings.sizeSection('1', '0', '100', '50');
        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.black);
    });

    await test.step("Add section in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Actions - 'Go to page' settings", async() => {
        await settings.openSection('Actions', 1);
        await settings.selectActions('Go to page','Collection List');
    });

    await test.step("'Section' element settings", async() => {
        await settings.sizeSection('1', '0', '100', '50');
        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.red);
    });

    await test.step("Add section in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Actions - 'Add item to cart' settings", async() => {
        await settings.openSection('Actions', 1);
        await settings.selectActions('Add item to cart', data.LamborghiniCountachData.productName);
    });

    await test.step("'Section' element settings", async() => {
        await settings.sizeSection('1', '0', '100', '50');
        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.blue);
    });

    await test.step("Add 'Cart Quantity' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCartQuantity);
        await builderPage.addElementsInSection('cart', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'cart-quantity');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add section in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Actions - 'Anchor' settings", async() => {
        await settings.openSection('Actions', 1);
        await settings.selectAnchorPointInActions('Header');
    });

    await test.step("'Section' element settings", async() => {
        await settings.sizeSection('1', '0', '100', '50');
        await settings.openSection('Background', 1);
        await settings.backgroundColor('transparent', data.Settings.colors.green);
    });

    await test.step("Open 'Collection List' page", async() => {
        await leftSidebarElements.changePage('Collection List');
    });

    await test.step("Add section in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Add 'Rich text' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementRichText);
        await builderPage.addElementsInSection('rich_text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Duplicate element using hotkey 'Cmd + D'", async() => {
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Duplicate);
        await leftSidebarElements.hotkey(keyboard.KeyboardShortcuts.Duplicate);
    });

    await test.step("Open 'Home' page", async() => {
        await leftSidebarElements.changePage('Home');
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Add item to cart", async() => {
        await eCommerceElements.checkQuantityContent('0');
        await layoutElements.clickOnSection(selectors.footer,'1');
        await eCommerceElements.checkQuantityContent('1');
    });

    await test.step("Go to Collection List", async() => {
        await layoutElements.clickOnSection(selectors.body,'0');
        await builderPage.containerIsHidden(selectors.body + ' app-section');
    });

    await test.step("Scroll to Header", async() => {
        await builderPage.containerIsHidden(selectors.footer + ' app-section >> nth=0');
        await layoutElements.clickOnSection(selectors.footer,'0');
        await builderPage.containerIsVisible(selectors.header + ' app-section');
    });

    await test.step("Go back (to home page)", async() => {
        await layoutElements.clickOnSection(selectors.header,'0');
        await builderPage.containerIsVisible(selectors.body + ' app-section');
    });
});