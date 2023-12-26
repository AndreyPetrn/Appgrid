import { Page, Locator } from '@playwright/test';
import selectors from "./selectors";

export class ProductPageElements {
    readonly page: Page;
    readonly popUpNotification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popUpNotification = page.frameLocator(selectors.iframeBuilder).locator('lib-toast');
    };

    private variantSelectorDropdown(container: string, number: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-variant-selector-option app-dropdown >> nth=${number}`);
    };

    private variantSelectorOptions(number: string, name: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`//div[@id="cdk-overlay-${number}"]//span[contains(., "${name}")]`);
    };

    async variantSelectorSettings(container: string, number: string, name: string): Promise<void> {
        await this.variantSelectorDropdown(container, number).click();
        await this.variantSelectorOptions(number, name).click();
    };
}