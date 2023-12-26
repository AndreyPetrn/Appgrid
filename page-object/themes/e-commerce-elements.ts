import { Page, expect, Locator } from '@playwright/test';
import selectors from "./selectors";
import { setValue } from "../methods";

export class ECommerceElements {
    readonly page: Page;
    readonly popUpNotification: Locator;
    readonly totalCart: Locator;
    readonly discountInput: Locator;
    readonly applyDiscount: Locator;
    readonly dropdownOption: Locator;
    readonly selectOption: Locator;
    readonly cartQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popUpNotification = page.frameLocator(selectors.iframeBuilder).locator('lib-toast >> nth=0');
        this.totalCart = page.frameLocator(selectors.iframeBuilder).locator(`//app-cart/app-section/app-section/app-text >> nth=5`);
        this.discountInput = page.frameLocator(selectors.iframeBuilder).locator('app-checkout-summary app-input');
        this.applyDiscount = page.frameLocator(selectors.iframeBuilder).locator('.summary-coupon__apply span');
        this.dropdownOption = page.frameLocator(selectors.iframeBuilder).locator('app-dropdown-form app-dropdown >> nth=0');
        this.selectOption = page.frameLocator(selectors.iframeBuilder).locator('app-dropdown-option span >> nth=0');
        this.cartQuantity = this.page.frameLocator(selectors.iframeBuilder).locator(`app-cart-quantity p`);
    };

    private wishListQuantity(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-wish-list-quantity span`);
    };

    private button(container: string, name: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-${name}-button`);
    };

    private content(container: string, name: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-${name}-line`);
    };

    private iconElement(container: string, element: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} [data-mat-icon-name*="${element}"]`);
    };

    private getProductTitle(container: string, name: string, number: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-${name}-line app-text >> nth=${number}`);
    };

    private searchBar(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-search-bar [type="text"]`);
    };

    private getGridInfo(container: string, number: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-grid-item app-text >> nth=${number}`);
    };

    private getSectionInfo(container: string, number: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-section app-text >> nth=${number}`);
    };

    private getBindingSliderInfo(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-binding-slider div`);
    };

    private getContainers(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-binding-slide > app-section`);
    };

    private getSummaryTotal(container: string, number: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} .summary-total div div >> nth=${number}`);
    };

    private clickContinueBtn(name: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`//span[contains(., '${name}')]`);
    };

    async checkWishListQuantity(container: string, number: string): Promise<void> {
        await expect(await this.wishListQuantity(container)).toHaveText(number);
    };

    async checkProductTitle(container: string, name: string, number: string, product: string): Promise<void> {
        await expect(await this.getProductTitle(container, name, number)).toHaveText(product);
    };

    async clickOnButton(container: string, name: string): Promise<void> {
        await this.button(container, name).click();
    };

    async clickProductIcon(container: string, element: string, click: number): Promise<void> {
        await this.iconElement(container, element).click({clickCount: click});
    };

    async checkContent(container: string, name: string, number: number): Promise<void> {
        await expect(await this.content(container, name)).toHaveCount(number);
    };

    async checkPopUpNotification(notification: string): Promise<void> {
        await this.page.waitForTimeout(2000);
        await expect(await this.popUpNotification).toHaveText(notification);
        await this.popUpNotification.isHidden();
    };

    async searchProduct(container: string, value: string): Promise<void> {
        const searchBar = await this.searchBar(container);
        await setValue(searchBar, value);
        await searchBar.press('Enter');
    };

    async checkGridInfo(container: string, number: string, product: string): Promise<void> {
        await expect(await this.getGridInfo(container, number)).toHaveText(product);
    };

    async checkTotalCart(total: string): Promise<void> {
        await expect(await this.totalCart).toHaveText(total);
    };

    async checkSectionInfo(container: string, number: string, product: string): Promise<void> {
        await expect(await this.getSectionInfo(container, number)).toHaveText(product);
    };

    async checkBindingSliderInfo(container: string, product: string): Promise<void> {
        await expect(await this.getBindingSliderInfo(container)).toHaveText(product);
    };

    async checkBindingSliderContainers(container: string, number: number): Promise<void> {
        await expect(await this.getContainers(container)).toHaveCount(number);
    };

    async checkSummaryTotal(container: string, number: string, product: string): Promise<void> {
        await expect(await this.getSummaryTotal(container, number)).toHaveText(product);
    };

    async addDiscount(value: string): Promise<void> {
        const input = this.page.frameLocator(selectors.iframeBuilder).locator('.summary-coupon');
        await setValue(await input, value);
        await this.applyDiscount.click();
    };

    async getCheckoutFormTitle(value: string, title: string): Promise<void> {
        const emailTitle = this.page.frameLocator(selectors.iframeBuilder).locator(`app-checkout-${value} > div > div + div`);
        await expect(await emailTitle).toHaveText(title);
    };

    async fillContactInformation(value: string): Promise<void> {
        const input = this.page.frameLocator(selectors.iframeBuilder).locator(`app-checkout-email app-input`);
        await setValue(await input, value);
    };

    async clickContinue(button: string): Promise<void> {
        await this.clickContinueBtn(button).click();
    };

    async fillShippingAddressInput(number: string, value: string): Promise<void> {
        const input = this.page.frameLocator(selectors.iframeBuilder).locator(`app-checkout-address app-input >> nth=${number}`);
        await setValue(await input, `${value}`);
    };

    async selectCountry(value: string): Promise<void> {
        await this.dropdownOption.click();
        const search = this.page.frameLocator(selectors.iframeBuilder).locator(`app-dropdown-search input`);
        await setValue(await search, value);
        await this.selectOption.click();

        await this.dropdownOption.click();
        await this.selectOption.click();
    };

    async fillShippingMethod(): Promise<void> {
        await this.dropdownOption.click();
        await this.selectOption.click();
    };

    async checkQuantityContent(number: string): Promise<void> {
        await expect(await this.cartQuantity).toHaveText(number);
    };
}