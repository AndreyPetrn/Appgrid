import {expect, Locator, Page} from '@playwright/test';

export class AccountsPage {
    readonly page: Page;
    readonly iaFilters: Locator;
    readonly alertMessage: Locator;
    readonly statusActive: Locator;
    readonly statusInactive: Locator;
    readonly closeAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iaFilters = page.locator('.ia-filters');
        this.closeAlert = page.locator('#toast-container svg');
        this.alertMessage = page.locator('[class*=toast__content] div');
        this.statusActive = page.locator('.ag-tag-label_green');
        this.statusInactive = page.locator('.ag-tag-label_dark-gray');
    };

    private status(name: string){
        return this.page.locator(`//span[contains(., '${name}')]`);
    };

    private nameBtn(name: string) {
        return this.page.locator(`//button[contains(., '${name}')]`);
    };

    private accountName(name: string) {
        return this.page.locator(`//td[contains(., '${name}')]`)
    };

    async clickNameBtn(name: string) {
        await this.nameBtn(name).click();
    };

    async clickAccountName(name: string) {
        await this.accountName(name).click();
    };

    async searchAccountName(name: string): Promise<void> {
        await this.iaFilters.waitFor();
        while(!(await this.page!.isVisible(`//td[contains(., '${name}')]`))){
            await this.page.locator('[class*=ag-button_mini] [data-mat-icon-name="arrow_right"]').click();
            await this.page.waitForTimeout(500); // wait to next page
        }
    };

    async checkStatus(name: string, status: string) {
        await expect(await this.status(name)).toHaveText(status);
    };

    async deactivateActivatedAccount(activeStatus: string, inactiveStatus: string, alert: any): Promise<void> {
        await this.page.isVisible(`//span[contains(., 'Details')]`);
        await this.page.waitForTimeout(1000);
        if (await this.page.isVisible(`//span[contains(., '${activeStatus}')]`))
        {
            await this.clickNameBtn('Deactivate account');
            await expect(await this.alertMessage).toHaveText(alert);
            await this.page.waitForTimeout(500);
            await this.closeAlert.click();
            await this.page.isVisible(`//span[contains(., '${inactiveStatus}')]`);
            await this.page.isHidden(`//span[contains(., '${activeStatus}')]`);
        }else {
            await this.page.isHidden(`//span[contains(., '${activeStatus}')]`);
            await this.page.isVisible(`//span[contains(., '${inactiveStatus}')]`);
        }
    };
}