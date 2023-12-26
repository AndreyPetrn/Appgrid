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

test("'Product title, Product description, Price and Compare at price' elements must display product information", async ({page}) => {
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

    await test.step("Add 'Section' element to header", async() => {
        await builderPage.addSectionInContainer(selectors.header);
    });

    await test.step("'Section' element settings", async() => {
        await settings.sizeSection('0','1','','100');
        await settings.nodeBindingSettings('Product', data.LamborghiniCountachData.productName);
    });

    await test.step("Add 'Compare At Price' element to 'Section' (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCompareAtPrice);
        await builderPage.addElementsInSection('compare_at_price', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Price' element to 'Section' (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPrice);
        await builderPage.addElementsInSection('price', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'text >> nth=1');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Product description' element to 'Section' (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductDescription);
        await builderPage.addElementsInSection('text', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'text >> nth=2');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Product title' element to 'Section' (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductTitle);
        await builderPage.addElementsInSection('heading', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'text >> nth=3');
        await leftSidebarElements.clearSearchInput();
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
        await settings.nodeBindingSettings('Product', data.VeyronData.productName);
    });

    await test.step("Add 'Compare At Price' element to 'Element Group' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCompareAtPrice);
        await builderPage.addElementInBasicContainer('compare_at_price', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Price' element to 'Element Group' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPrice);
        await builderPage.addElementInBasicContainer('price', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text >> nth=1');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Product description' element to 'Element Group' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductDescription);
        await builderPage.addElementInBasicContainer('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text >> nth=2');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Product title' element to 'Element Group' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductTitle);
        await builderPage.addElementInBasicContainer('heading', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text >> nth=3');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Section' element to footer", async() => {
        await builderPage.addSectionInContainer(selectors.footer);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Grid' element to section", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementGrid);
        await builderPage.addElementInEmptySection('grid', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'grid');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Grid' element settings", async() => {
        await settings.sizeSection('0','1','','100');
        await settings.fillGridOption('1','1');
        await settings.nodeBindingSettings('Certain products', data.AlpineData.productName);
    });

    await test.step("Add 'Compare At Price' element to 'Grid' (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCompareAtPrice);
        await builderPage.addElementInGridSection('compare_at_price', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Price' element to 'Grid' (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPrice);
        await builderPage.addElementInGridSection('price', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'text >> nth=1');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Product description' element to 'Grid' (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductDescription);
        await builderPage.addElementInGridSection('text', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'text >> nth=2');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Product title' element to 'Grid' (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductTitle);
        await builderPage.addElementInGridSection('heading', selectors.footer);
        await builderPage.waitElementInSection(selectors.footer, 'text >> nth=3');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check product 'Lamborghini'", async() => {
        await eCommerceElements.checkSectionInfo(selectors.header,'0', data.LamborghiniCountachData.productName);
        await eCommerceElements.checkSectionInfo(selectors.header,'1', data.LamborghiniCountachData.productDescription);
        await eCommerceElements.checkSectionInfo(selectors.header,'2', data.LamborghiniCountachData.productPrice);
        await eCommerceElements.checkSectionInfo(selectors.header,'3', data.LamborghiniCountachData.productOldPrice);
    });

    await test.step("Check product 'Veyron'", async() => {
        await eCommerceElements.checkSectionInfo(selectors.body,'0', data.VeyronData.productName);
        await eCommerceElements.checkSectionInfo(selectors.body,'1', data.VeyronData.productDescription);
        await eCommerceElements.checkSectionInfo(selectors.body,'2', data.VeyronData.productPrice);
        await eCommerceElements.checkSectionInfo(selectors.body,'3', data.VeyronData.productOldPrice);
    });

    await test.step("Check product 'Alpine'", async() => {
        await eCommerceElements.checkGridInfo(selectors.footer,'0', data.AlpineData.productName);
        await eCommerceElements.checkGridInfo(selectors.footer,'1', data.AlpineData.productDescription);
        await eCommerceElements.checkGridInfo(selectors.footer,'2', data.AlpineData.productPrice);
        await eCommerceElements.checkGridInfo(selectors.footer,'3', data.AlpineData.productOldPrice);
    });
});