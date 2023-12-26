const  { test                } = require('@playwright/test');
import { Constants           } from "../../../data/const";
import { SidebarElements     } from "../../../page-object/themes/sidebar";
import { UniversesNavPage    } from "../../../page-object/universes-nav/universes-nav";
import { UserDataHelper      } from "../../../helpers/data-helpers/user.data.helper";
import { LoginPage           } from "../../../page-object/login/loginPage";
import { ThemesPage          } from "../../../page-object/themes/themes-page";
import { LeftSidebarElements } from "../../../page-object/themes/left-sidebar";
import faker from "@faker-js/faker";

let browser = Constants.APP_GRID_LOGIN;
const user = UserDataHelper.getUser('user_builder');
const data = require('../../../page-object/data-page.json').Themes.Builder;
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

test("Elements:", async ({page}) => {
    const themesPage = new ThemesPage(page);
    const universesNav = new UniversesNavPage(page);
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

    await test.step("Search 'section' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementSection);
        await leftSidebarElements.checkElementFound('section');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'element group' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementElementGroup);
        await leftSidebarElements.checkElementFound('element_group');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'overflow box' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementOverflowBox);
        await leftSidebarElements.checkElementFound('overflow_box');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'sticky section' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementStickySection);
        await leftSidebarElements.checkElementFound('sticky_section');
        await leftSidebarElements.clearSearchInput();
    });

    // todo https://www.notion.so/Refresh-code-elements-f041c0ded5fc419193e0d99459044d08
    // await test.step("Search 'button' element", async() => {
    //     await leftSidebarElements.searchElement(data.Elements.elementButton);
    //     await leftSidebarElements.checkElementFound('button');
    //     await leftSidebarElements.clearSearchInput();
    // });

    await test.step("Search 'grid' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementGrid);
        await leftSidebarElements.checkElementFound('grid');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'text' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementText);
        await leftSidebarElements.checkElementFound('text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'heading' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementHeading);
        await leftSidebarElements.checkElementFound('heading');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'rich text' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementRichText);
        await leftSidebarElements.checkElementFound('rich_text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'image' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await leftSidebarElements.checkElementFound('image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'image' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementImage);
        await leftSidebarElements.checkElementFound('image');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'thumbnail gallery' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementThumbnailGallery);
        await leftSidebarElements.checkElementFound('thumbnail_gallery');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'slider' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementSlider);
        await leftSidebarElements.checkElementFound('slider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'preview gallery' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPreviewGallery);
        await leftSidebarElements.checkElementFound('preview_gallery');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'tabs' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementTabs);
        await leftSidebarElements.checkElementFound('tabs');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'code' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCodeSnippet);
        await leftSidebarElements.checkElementFound('code');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'video' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementVideo);
        await leftSidebarElements.checkElementFound('video');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'icon' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementIcon);
        await leftSidebarElements.checkElementFound('icon');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'dropdown' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementContentDropdown);
        await leftSidebarElements.checkElementFound('dropdown');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'divider' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementDivider);
        await leftSidebarElements.checkElementFound('divider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'hamburger menu' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementHamburgerMenu);
        await leftSidebarElements.checkElementFound('hamburger_menu');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'pagination' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPagination);
        await leftSidebarElements.checkElementFound('pagination');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'tabbed menu' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementTabbedMenu);
        await leftSidebarElements.checkElementFound('tabbed_menu');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'products slider' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementBindingSlider);
        await leftSidebarElements.checkElementFound('products_slider');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'cart' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCartQuantity);
        await leftSidebarElements.checkElementFound('cart');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'cart table' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCart);
        await leftSidebarElements.checkElementFound('cart_table');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'checkout form' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCheckoutForm);
        await leftSidebarElements.checkElementFound('checkout_form');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'checkout summary' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementCheckoutSummary);
        await leftSidebarElements.checkElementFound('checkout_summary');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'search bar' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementSearchBar);
        await leftSidebarElements.checkElementFound('search_bar');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'wishlist' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementWishList);
        await leftSidebarElements.checkElementFound('wishlist');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'items count' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementWishListQuantity);
        await leftSidebarElements.checkElementFound('items_count');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'quantity selector' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementQuantitySelector);
        await leftSidebarElements.checkElementFound('quantity_selector');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'variant selector' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementVariantSelector);
        await leftSidebarElements.checkElementFound('variant_selector');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'button' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementBuyButton);
        await leftSidebarElements.checkElementFound('button');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'icon' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementLikeButton);
        await leftSidebarElements.checkElementFound('icon');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'heading' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductTitle);
        await leftSidebarElements.checkElementFound('heading');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'text' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementProductDescription);
        await leftSidebarElements.checkElementFound('text');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'price' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPrice);
        await leftSidebarElements.checkElementFound('price');
        await leftSidebarElements.clearSearchInput();
    });

    await test.step("Search 'compare at price' element", async() => {
        await leftSidebarElements.searchElement(data.Elements.elementPrice);
        await leftSidebarElements.checkElementFound('compare_at_price');
        await leftSidebarElements.clearSearchInput();
    });
});