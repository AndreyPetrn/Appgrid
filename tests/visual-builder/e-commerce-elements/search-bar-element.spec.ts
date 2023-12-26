const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { MediaElements       } from "../../../page-object/themes/madia-elements";
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

test("Check work of search bar element", async ({page}) => {
    const universesNav = new UniversesNavPage(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const mediaElements = new MediaElements(page);
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
        await settings.sizeSection('0','0','50','50');
    });

    await test.step("Add 'Icon' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementIcon);
        await builderPage.addElementsInSection('icon', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'icon');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Icon' element settings", async() => {
        await settings.sizeSection('0', '0', '50', '50');

        await mediaElements.fillIconData('50', data.Settings.colors.black);
        await mediaElements.chooseIcon('arrow_back_ios_new', selectors.header);

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Home');
    });

    await test.step("Add sections to body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Add 'Search bar' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementSearchBar);
        await builderPage.addElementsInSection('search_bar', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'search-bar');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Open 'Collection Page' page", async() => {
        await leftSidebarElements.changePage('Collection Page');
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
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Grid' element to section", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementGrid);
        await builderPage.addElementInEmptySection('grid', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'grid');
        await leftSidebarElements.clearSearchInput();
        await settings.fillGridOption('1','1');
    });

    await test.step("Add 'image' element to 'Grid' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementInGridSection('image', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Compare At Price' element to 'Grid' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCompareAtPrice);
        await builderPage.addElementInGridSection('compare_at_price', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Price' element to 'Grid' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPrice);
        await builderPage.addElementInGridSection('price', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text >> nth=1');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Product description' element to 'Grid' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductDescription);
        await builderPage.addElementInGridSection('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text >> nth=2');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Product title' element to 'Grid' (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductTitle);
        await builderPage.addElementInGridSection('heading', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text >> nth=3');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Search product 'Lamborghini'", async() => {
        await mediaElements.clickOnIcon('arrow_back_ios_new');
        await eCommerceElements.searchProduct(selectors.body, data.LamborghiniCountachData.productName);
    });

    await test.step("Check product 'Lamborghini'", async() => {
        await mediaElements.checkImagesCar(selectors.body,'image','2');
        await eCommerceElements.checkGridInfo(selectors.body,'0', data.LamborghiniCountachData.productName);
        await eCommerceElements.checkGridInfo(selectors.body,'1', data.LamborghiniCountachData.productDescription);
        await eCommerceElements.checkGridInfo(selectors.body,'2', data.LamborghiniCountachData.productPrice);
        await eCommerceElements.checkGridInfo(selectors.body,'3', data.LamborghiniCountachData.productOldPrice);
    });

    await test.step("Search product 'Veyron'", async() => {
        await mediaElements.clickOnIcon('arrow_back_ios_new');
        await eCommerceElements.searchProduct(selectors.body, data.VeyronData.productName);
    });

    await test.step("Check product 'Veyron'", async() => {
        await mediaElements.checkImagesCar(selectors.body,'image','5');
        await eCommerceElements.checkGridInfo(selectors.body,'0', data.VeyronData.productName);
        await eCommerceElements.checkGridInfo(selectors.body,'1', data.VeyronData.productDescription);
        await eCommerceElements.checkGridInfo(selectors.body,'2', data.VeyronData.productPrice);
        await eCommerceElements.checkGridInfo(selectors.body,'3', data.VeyronData.productOldPrice);
    });

    await test.step("Search product 'Alpine'", async() => {
        await mediaElements.clickOnIcon('arrow_back_ios_new');
        await eCommerceElements.searchProduct(selectors.body, data.AlpineData.productName);
    });

    await test.step("Check product 'Alpine'", async() => {
        await mediaElements.checkImagesCar(selectors.body,'image','3');
        await eCommerceElements.checkGridInfo(selectors.body,'0', data.AlpineData.productName);
        await eCommerceElements.checkGridInfo(selectors.body,'1', data.AlpineData.productDescription);
        await eCommerceElements.checkGridInfo(selectors.body,'2', data.AlpineData.productPrice);
        await eCommerceElements.checkGridInfo(selectors.body,'3', data.AlpineData.productOldPrice);
    });
});