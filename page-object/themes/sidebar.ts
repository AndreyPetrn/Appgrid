import {expect, Locator, Page} from '@playwright/test';

export class SidebarElements {
    readonly page: Page;
    readonly appGridLogo: Locator;
    readonly dropdownDevice: Locator;
    readonly views: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appGridLogo = page.locator('[class="bc-logo"]');
        this.dropdownDevice = page.locator('.bc-header-preview-button_center');
        this.views = page.locator('.bc-header-device-dialog');
    };

    private device(name: string) {
        return this.page.locator(`//div[@class="bc-header-device-dialog__title"][text()='${name}']`);
    };

    private viewsData(value: string) {
        return this.page.locator(`//app-header-device-dialog//*[contains(@class, "bc-header-device-dialog__item")][contains(., "${value}")]`).textContent();
    };

    async backToAdminPanel(): Promise<void> {
        await this.appGridLogo.click();
    };

    async chooseDevise(name: string): Promise<void> {
        await this.openViews();
        await this.clickOnDevise(name);
    };

    async clickOnDevise(name: string): Promise<void> {
        await this.device(name).click();
        await this.views.isHidden();
    };

    async openViews(): Promise<void> {
        await this.dropdownDevice.click();
        await this.views.isVisible();
    };

    async checkViews(value: string, data: string): Promise<void> {
        await expect(await this.viewsData(value)).toContain(data);
    };
}