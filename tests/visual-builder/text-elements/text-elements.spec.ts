const  { test                } = require('@playwright/test');
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import { TextElements        } from "../../../page-object/themes/text-elements";
import { Constants           } from "../../../data/const";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { BuilderPage         } from "../../../page-object/themes/builder";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { MediaElements       } from "../../../page-object/themes/madia-elements";
import selectors from "../../../page-object/themes/selectors";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const data = require('../../../page-object/data-page.json').Themes.Builder;
const themeName = `New_Theme_${faker.random.alphaNumeric(4)}`;
const car_third = 'data/images/car-3.png';

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

test("Check work of text elements", async ({page}) => {
  const universesNav = new UniversesNavPage(page);
  const themesPage = new ThemesPage(page);
  const builderPage = new BuilderPage(page);
  const textElements = new TextElements(page);
  const mediaElements = new MediaElements(page);
  const sidebarElements = new SidebarElements(page);
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

  await test.step("Add sections in header", async() => {
    await builderPage.addSectionInContainer(selectors.header);
  });

  await test.step("Add 'Header' element to a section (header)", async() => {
    await leftSidebarElements.searchElement(data.Elements.elementHeading);
    await builderPage.addElementsInSection('heading', selectors.header);
    await builderPage.waitElementInSection(selectors.header, 'text');
    await leftSidebarElements.clearSearchInput();
  });

  await test.step("Heading element settings", async() => {
    await textElements.fillTextElement(selectors.header,'text', data.ProductData.themeHeader);
    await textElements.addColor(data.Settings.colors.red);
    await textElements.addTextWidth('22');
    await textElements.allCapsBtn();
    await textElements.textAlignmentForCenter();
    await textElements.textUnderlined();
  });

  await test.step("Add sections in body", async() => {
    await builderPage.addSectionInContainer(selectors.body);
  });

  await test.step("Add 'Rich text' element to section (body)", async() => {
    await leftSidebarElements.searchElement(data.Elements.elementRichText);
    await builderPage.addElementsInSection('rich_text', selectors.body);
    await builderPage.waitElementInSection(selectors.body, 'image');
    await leftSidebarElements.clearSearchInput();
  });

  await test.step("Heading element settings", async() => {
    await textElements.fillTextElement(selectors.body,'text >> nth=0', data.ProductData.topCarHeader);
    await textElements.addColor(data.Settings.colors.blue);
    await textElements.capitalizeBtn();
    await textElements.textAlignmentForRight();
  });

  await test.step("Add image (PNG)", async() => {
    await mediaElements.uploadImage(selectors.body,'image', car_third);
    await mediaElements.checkImagesCar(selectors.body,'image','3');
  });

  await test.step("Text element settings", async() => {
    await textElements.fillTextElement(selectors.body,'text >> nth=1', data.ProductData.topCarInfo);
    await textElements.addColor(data.Settings.colors.blue);
    await textElements.lovercaseBtn();
    await textElements.textAlignmentForJustify();
  });

  await test.step("Add sections in footer", async() => {
    await builderPage.chooseLayer('element_group');
    await builderPage.addSectionInContainer(selectors.footer);
  });

  await test.step("Add a 'Text' element to section (footer) and configure settings", async() => {
    await leftSidebarElements.searchElement(data.Elements.elementText);
    await builderPage.addElementsInSection('text', selectors.footer);
    await builderPage.waitElementInSection(selectors.footer, 'text');
    await leftSidebarElements.clearSearchInput();
  });

  await test.step("Text element settings", async() => {
    await textElements.fillTextElement(selectors.footer,'text', data.ProductData.contactUs);
    await textElements.addColor(data.Settings.colors.red);
    await textElements.addTextHeight('4');
    await textElements.allCapsBtn();
    await textElements.textAlignmentForLeft();
    await textElements.textStrikethrough();
  });

  await test.step("Use theme and check name", async() => {
    await sidebarElements.backToAdminPanel();
    await themesPage.themeSettings('checkmark', '0');
    await themesPage.checkUsedTheme(themeName);
  });
});

