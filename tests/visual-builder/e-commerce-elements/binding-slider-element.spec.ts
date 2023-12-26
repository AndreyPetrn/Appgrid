const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { NavigationElements  } from "../../../page-object/themes/navigation-elements";
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

test("Check work of binding slider elements", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const mediaElements = new MediaElements(page);
    const universesNav = new UniversesNavPage(page);
    const sidebarElements = new SidebarElements(page);
    const eCommerceElements = new ECommerceElements(page);
    const navigationElements = new NavigationElements(page);
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

    await test.step("Add and configure sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
        await settings.sizeSection('0','1','','100');
    });

    await test.step("Add 'Binding Slider' elements to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementBindingSlider);
        await builderPage.addElementsInSection('products_slider', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'binding-slider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Binding Slider' element settings (Collections)", async() => {
        await eCommerceElements.checkBindingSliderInfo(selectors.body, data.elementInfo.bindingSliderInfo);
        await settings.optionsSection('binding-slider','0');
        await settings.optionsSection('binding-slider','3');
        await settings.nodeBindingSettingsOneValue('Collections');
    });

    await test.step("Check collections in 'Binding Slider' element", async() => {
        await eCommerceElements.checkBindingSliderContainers(selectors.body, 2);
        await mediaElements.checkDots(selectors.body,1);
    });

    await test.step("'Binding Slider' element settings (Certain products)", async() => {
        await settings.fillOptionsInput('binding-slider','0','1');
        await mediaElements.checkDots(selectors.body,2);
        await settings.optionsSection('binding-slider','0');
        await settings.optionsSection('binding-slider','1');
        await settings.nodeBindingSettings('Certain products', data.AlpineData.productName);
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check product 'Lamborghini'", async() => {
        await mediaElements.checkImagesCar(selectors.body,'image','3');
        await eCommerceElements.checkSectionInfo(selectors.body,'0', data.AlpineData.productPrice);
        await eCommerceElements.checkSectionInfo(selectors.body,'1', data.AlpineData.productOldPrice);
        await eCommerceElements.checkSectionInfo(selectors.body,'2', data.AlpineData.productName);
        await eCommerceElements.checkSectionInfo(selectors.body,'4','Add to cart');
    });

    await test.step("Add to cart", async() => {
        await eCommerceElements.clickOnButton(selectors.body,'like');
        await navigationElements.clickStandartMenuButton('Add to cart');
        await eCommerceElements.clickProductIcon(selectors.body,'plus',1);
        await eCommerceElements.clickProductIcon(selectors.body,'minus',2);
        // wait 500 ms?
        await eCommerceElements.checkSectionInfo(selectors.body,'4','Add to cart');
    });
});