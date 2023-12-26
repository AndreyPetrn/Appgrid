import { Locator, Page } from '@playwright/test';

export class UniversesNavPage {
    readonly page: Page;
    readonly titlePage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titlePage = page.locator('.ag-heading__h');
    };

    async waitSidebar(): Promise<void> {
        await this.page.waitForSelector('div.sidebar');
    };

    private navItem(value: string) {
        return this.page.locator(`[data-mat-icon-name="${value}"]`);
    };

    private nameTabBtn(name: string){
        return this.page.locator(`//span[contains(., '${name}')]`);
    };

    private nameBtnText(name: string) {
        return this.page.locator(`//span[text() = '${name}']`);
    };

    async clickNameBtnText(name: any) {
        const nameBtn = await this.nameBtnText(name);
        await nameBtn!.waitFor();
        await nameBtn!.click();
    };

    async clickBtn(name: any): Promise<void> {
        const nameTab = await this.nameTabBtn(name);
        await nameTab!.waitFor();
        await nameTab!.click();
    };

    async openPage(pageName: string) {
        const navItem = await this.navItem(pageName);
        await navItem!.waitFor();
        await navItem!.click();
    };
}