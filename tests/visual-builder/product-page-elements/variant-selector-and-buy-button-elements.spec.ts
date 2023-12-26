const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { ProductPageElements } from "../../../page-object/themes/product-page-elements";
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

test("Integration of 'Variant Selector' and 'Buy button' elements", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const universesNav = new UniversesNavPage(page);
    const sidebarElements = new SidebarElements(page);
    const eCommerceElements = new ECommerceElements(page);
    const leftSidebarElements = new LeftSidebarElements(page);
    const productPageElements = new ProductPageElements(page);

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

    await test.step("Add 'Section' element to body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Element Group' element to section", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementElementGroup);
        await builderPage.addElementsInSection('element_group', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'element-container+app-section');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Element Group' element settings", async() => {
        await settings.sizeSection('0','1','','100');
        await settings.nodeBindingSettings('Product', data.AlpineData.productName);
    });

    await test.step("Add 'Buy Button' element to 'Element Group' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementBuyButton);
        await builderPage.addElementInBasicContainer('button', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'buy-button');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Variant Selector' element to 'Element Group' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementVariantSelector);
        await builderPage.addElementInBasicContainer('variant_selector', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'variant-selector');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add sections in footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add 'Cart' elements to section (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCart);
        await builderPage.addElementsInSection('cart_table', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'cart');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("'Variant Selector' set 'Green / M / Silk' parameters ", async() => {
        await productPageElements.variantSelectorSettings(selectors.body,'0','Green');
        await productPageElements.variantSelectorSettings(selectors.body,'1','M');
        await productPageElements.variantSelectorSettings(selectors.body,'2','Silk');
    });

    await test.step("Add and check product in cart", async() => {
        await eCommerceElements.checkTotalCart('CA$0.00');
        await eCommerceElements.clickOnButton(selectors.body,'buy');
        await eCommerceElements.checkPopUpNotification(data.Notification.aAddedToCart);
        await eCommerceElements.checkContent(selectors.footer, 'cart',1);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','0', data.AlpineData.productName);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','1', 'Green / M / Silk');
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','2', data.AlpineData.productPrice);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','3', data.AlpineData.productOldPrice);
        await eCommerceElements.checkTotalCart('CA$50.00');
    });

    await test.step("Remove product from Cart List", async() => {
        await eCommerceElements.clickProductIcon(selectors.footer,'cross',1);
    });

    await test.step("'Variant Selector' set 'Yellow / L / Сotton' parameters ", async() => {
        await productPageElements.variantSelectorSettings(selectors.body,'0','Yellow');
        await productPageElements.variantSelectorSettings(selectors.body,'1','L');
        await productPageElements.variantSelectorSettings(selectors.body,'2','Сotton');
    });

    await test.step("Add and check product in cart", async() => {
        await eCommerceElements.checkTotalCart('CA$0.00');
        await eCommerceElements.clickOnButton(selectors.body,'buy');
        await eCommerceElements.checkPopUpNotification(data.Notification.aAddedToCart);
        await eCommerceElements.checkContent(selectors.footer, 'cart',1);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','0', data.AlpineData.productName);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','1', 'Yellow / L / Сotton');
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','2', data.AlpineData.productPrice);
        await eCommerceElements.checkProductTitle(selectors.footer,'cart','3', data.AlpineData.productOldPrice);
        await eCommerceElements.checkTotalCart('CA$50.00');
    });
});