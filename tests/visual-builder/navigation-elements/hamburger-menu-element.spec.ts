const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { NavigationElements  } from "../../../page-object/themes/navigation-elements";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import { Settings            } from "../../../page-object/themes/settings";
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

test("Check work of hamburger menu element", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const universesNav = new UniversesNavPage(page);
    const sidebarElements = new SidebarElements(page);
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

    await test.step("Add sections in header, body and footer", async() => {
        await builderPage.addSectionInContainer(selectors.header);
        await builderPage.addSectionInContainer(selectors.body);
        await builderPage.addSectionInContainer(selectors.footer);
    });

    await test.step("Add 'Hamburger Menu' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementHamburgerMenu);
        await builderPage.addElementsInSection('hamburger_menu', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'navigation-hamburger');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Open 'Hamburger Menu' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.selectElementInLayers('Menu','1');
        await leftSidebarElements.openSidebar('add');
    });

    // todo https://www.notion.so/Refresh-code-elements-f041c0ded5fc419193e0d99459044d08
    // await test.step("Add 'Button' element to 'Hamburger Menu'", async() => {
    //     await leftSidebarElements.searchElement(data.Elements.elementButton);
    //     await builderPage.addElementInHamburgerMenu('button');
    //     await builderPage.waitElementInHamburgerMenu('section');
    //     await leftSidebarElements.clearSearchInput();
    // });

    await test.step("Add 'Content Dropdown' element to 'Hamburger Menu'", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementContentDropdown);
        await builderPage.addElementInHamburgerMenu('dropdown');
        await builderPage.waitElementInHamburgerMenu('content-menu-dropdown');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Divider' element to 'Hamburger Menu'", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementDivider);
        await builderPage.addElementInHamburgerMenu('divider');
        await builderPage.waitElementInHamburgerMenu('divider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Image' element to 'Hamburger Menu'", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await builderPage.addElementInHamburgerMenu('image');
        await builderPage.waitElementInHamburgerMenu('image');
    });

    await test.step("Close 'Hamburger Menu' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.selectElementInLayers('Section','0');
        await leftSidebarElements.openSidebar('add');
    });

    await test.step("Add 'Hamburger Menu' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementHamburgerMenu);
        await builderPage.addElementsInSection('hamburger_menu', selectors.body);
        await builderPage.waitElementInSection(selectors.header, 'navigation-hamburger');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Text' element to 'Hamburger Menu'", async() => {
        await navigationElements.openHamburgerMenu(selectors.body);
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementInHamburgerMenu('text');
        await builderPage.waitElementInHamburgerMenu('text');
        await leftSidebarElements.clearSearchInput();
    });

    // await test.step("Add 'Heading' element to 'Hamburger Menu'", async() => {
    //     await leftSidebarElements.searchElement(data.Elements.elementHeading);
    //     await builderPage.addElementInHamburgerMenu('heading');
    //     await builderPage.waitElementInHamburgerMenu('text >> nth=1');
    //     await leftSidebarElements.clearSearchInput();
    // });

    // await test.step("Add 'Rich Text' element to 'Hamburger Menu'", async() => {
    //     await leftSidebarElements.searchElement(data.Elements.elementRichText);
    //     await builderPage.addElementInHamburgerMenu('rich_text');
    //     await builderPage.waitElementInHamburgerMenu('section');
    //     await leftSidebarElements.clearSearchInput();
    // });

    await test.step("Close 'Hamburger Menu' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.selectElementInLayers('Section','0');
        await leftSidebarElements.openSidebar('add');
    });

    await test.step("Add 'Hamburger Menu' element to section (footer)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementHamburgerMenu);
        await builderPage.addElementsInSection('hamburger_menu', selectors.footer);
        await builderPage.waitElementInSection(selectors.header, 'navigation-hamburger');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Add 'Element Group' element to 'Hamburger Menu'", async() => {
        await navigationElements.openHamburgerMenu(selectors.footer);
        await leftSidebarElements.searchElement(data.Elements.elementElementGroup);
        await builderPage.addElementInHamburgerMenu('element_group');
        await builderPage.waitElementInHamburgerMenu('b-empty');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("'Element Group' element settings", async() => {
        await settings.sizeSection('0','1','','100');
        await settings.nodeBindingSettings('Product', data.VeyronData.productName);
    });

    // await test.step("Add 'Compare At Price' element to 'Element Group'", async() => {
    //     await leftSidebarElements.searchElement(data.Elements.elementCompareAtPrice);
    //     await builderPage.addElementInHamburgerMenu('compare_at_price');
    //     await builderPage.waitElementInHamburgerMenu('text');
    //     await leftSidebarElements.clearSearchInput();
    // });
    //
    // await test.step("Add 'Price' element to 'Element Group'", async() => {
    //     await leftSidebarElements.searchElement(data.Elements.elementPrice);
    //     await builderPage.addElementInHamburgerMenu('price');
    //     await builderPage.waitElementInHamburgerMenu('text >> nth=1');
    //     await leftSidebarElements.clearSearchInput();
    // });
    //
    // await test.step("Add 'Product description' element to 'Element Group'", async() => {
    //     await leftSidebarElements.searchElement(data.Elements.elementProductDescription);
    //     await builderPage.addElementInHamburgerMenu('text');
    //     await builderPage.waitElementInHamburgerMenu('text >> nth=2');
    //     await leftSidebarElements.clearSearchInput();
    // });
    //
    // await test.step("Add 'Product title' element to 'Element Group'", async() => {
    //     await leftSidebarElements.searchElement(data.Elements.elementProductTitle);
    //     await builderPage.addElementInHamburgerMenu('heading');
    //     await builderPage.waitElementInHamburgerMenu('text >> nth=3');
    //     await leftSidebarElements.clearSearchInput();
    // });

    await test.step("Close 'Hamburger Menu' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.selectElementInLayers('Section','0');
    });
});