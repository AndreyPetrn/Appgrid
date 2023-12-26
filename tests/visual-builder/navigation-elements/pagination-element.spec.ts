const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { MediaElements       } from "../../../page-object/themes/madia-elements";
import { TextElements        } from "../../../page-object/themes/text-elements";
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

test("Check work of pagination element", async ({page}) => {
    const settings = new Settings(page);
    const themesPage = new ThemesPage(page);
    const builderPage = new BuilderPage(page);
    const textElements = new TextElements(page);
    const mediaElements = new MediaElements(page);
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
    });

    await test.step("Add 'Pagination' element to section (header)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPagination);
        await builderPage.addElementsInSection('pagination', selectors.header);
        await builderPage.waitElementInSection(selectors.header, 'pagination');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Select 'Previous Button' in layers", async() => {
        await leftSidebarElements.openSidebar('layers');
        await settings.openDropdownInLayers('Pagination');
        await settings.selectElementInLayers('Previous Button','0');
    });

    await test.step("Previous Button element settings", async() => {
        await settings.alignmentPositionBtn('alignment_1_left');
        await settings.sizeSection('1','0','50','');
    });

    await test.step("Previous Button > Text element settings", async() => {
        await settings.selectElementInLayers('Text','0');
        await textElements.fillTextElement(selectors.header,'text >> nth=0', 'Home');
    });

    await test.step("Previous Button > Icon element settings", async() => {
        await settings.selectElementInLayers('Icon','0');
        await settings.sizeSection('0', '0', '40', '40');

        await mediaElements.fillIconData('40', data.Settings.colors.black);
        await mediaElements.chooseIcons('arrow_left_3');
        await settings.selectElementInLayers('Text','0');
        await settings.selectElementInLayers('Icon','0');

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Home');
    });

    await test.step("Next Button element settings", async() => {
        await settings.selectElementInLayers('Next Button','0');
        await settings.alignmentPositionBtn('alignment_3_right');
        await settings.sizeSection('1','0','50','');
    });

    await test.step("Previous Button > Text element settings", async() => {
        await settings.selectElementInLayers('Text','1');
        await textElements.fillTextElement(selectors.header,'text >> nth=1', 'Collection');
    });

    await test.step("Next Button > Icon element settings", async() => {
        await settings.selectElementInLayers('Icon','1');
        await settings.sizeSection('0', '0', '40', '40');

        await mediaElements.fillIconData('40', data.Settings.colors.black);
        await mediaElements.chooseIcons('arrow_right_3');
        await settings.selectElementInLayers('Text','1');
        await settings.selectElementInLayers('Icon','1');

        await settings.openSection('Link to', 1);
        await settings.linkToSection('Collection List');
        await builderPage.chooseLayer('header');
        await builderPage.clickContainer(selectors.body);
    });

    await test.step("Add 'Text' element to section (body)", async() => {
        await leftSidebarElements.openSidebar('add');
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Text element settings", async() => {
        await textElements.fillTextElement(selectors.body,'text', 'Home');
        await textElements.checkTextInElement(selectors.body,'text','Home');
    });

    await test.step("Open 'Collection List' page", async() => {
        await leftSidebarElements.changePage('Collection List');
    });

    await test.step("Add sections in body", async() => {
        await builderPage.addSectionInContainer(selectors.body);
    });

    await test.step("Add 'Text' element to section (body)", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await builderPage.addElementsInSection('text', selectors.body);
        await builderPage.waitElementInSection(selectors.body, 'text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Text element settings", async() => {
        await textElements.fillTextElement(selectors.body,'text', 'Collection List');
        await textElements.checkTextInElement(selectors.body,'text','Collection List');
        await builderPage.chooseLayer('element_group');
    });

    await test.step("Open preview", async() => {
        await leftSidebarElements.openPreview();
    });

    await test.step("Check 'Collection List' page", async() => {
        await textElements.checkTextInElement(selectors.body,'text','Collection List');
    });

    await test.step("Go to 'Home' page", async() => {
        await navigationElements.clickTabbedMenuIcon('arrow_left_3');
        await textElements.checkTextInElement(selectors.body,'text','Home');
    });

    await test.step("Go to 'Collection List' page", async() => {
        await navigationElements.clickTabbedMenuIcon('arrow_right_3');
        await page.waitForTimeout(1000);
        await textElements.checkTextInElement(selectors.body,'text','Collection List');
    });
});