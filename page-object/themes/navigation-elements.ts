import {Page, Locator, expect} from '@playwright/test';
import selectors from "./selectors";
import {setValue} from "../methods";

export class NavigationElements {
    readonly page: Page;
    readonly cartQuantity: Locator;
    readonly wishListQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartQuantity = page.frameLocator(selectors.iframeBuilder).locator('app-cart-quantity p');
        this.wishListQuantity = page.frameLocator(selectors.iframeBuilder).locator('app-wish-list-quantity span');
    };

    private tabbedSection(number: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`//app-section-sticky/app-section >> nth=${number}`);
    };

    private activeSection(name: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`//app-section-sticky/app-section[contains(@class, "b-active")][contains(., "${name}")]`);
    };

    private tabbedMenuIcon(element: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`[data-mat-icon-name*="${element}"]`);
    };

    private standartMenuSection(number: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`//app-section/app-section/app-section >> nth=${number}`);
    };

    private standartMenuButton(name: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`//app-body/app-section//app-text[contains(., "${name}")]`);
    };

    async tabbedSectionSettings(number: string): Promise<void> {
        await this.tabbedSection(number).click({clickCount: 3});
    };

    async standartMenuSectionSettings(number: string): Promise<void> {
        await this.standartMenuSection(number).click({clickCount: 3});
    };

    async checkActiveSection(section: string): Promise<void> {
        await this.activeSection(section).waitFor({timeout: 50000});
    };

    async checkWishListQuantity(quantity: string): Promise<void> {
        await expect(this.wishListQuantity).toHaveText(quantity);
    };

    async checkCartQuantity(quantity: string): Promise<void> {
        await expect(this.cartQuantity).toHaveText(quantity);
    };

    async clickTabbedMenuIcon(element: string): Promise<void> {
        await this.tabbedMenuIcon(element).waitFor();
        await this.tabbedMenuIcon(element).click();
    };

    async fillTextInStandartMenu(number: string, textData: string): Promise<void> {
        await this.standartMenuSectionSettings(number);
        await setValue(await this.standartMenuSection(number), textData);
    };

    async clickStandartMenuButton(name: string): Promise<void> {
        await this.standartMenuButton(name).click();
    };

    async checkFooter(name: string): Promise<void> {
        await this.standartMenuSection(name).click();
    };

    async openHamburgerMenu(container: string): Promise<void> {
        await this.page.frameLocator(selectors.iframeBuilder).locator(`${container} [data-mat-icon-name*="menu"]`).click({clickCount: 2});
    };
}