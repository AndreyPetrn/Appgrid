import {expect, Locator, Page} from '@playwright/test';
import {setValue} from "../methods";

export class InternalThemesPage {
    readonly page: Page;
    readonly addThemeModalTitle: Locator;
    readonly upload: Locator;
    readonly image: Locator;
    readonly appsDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addThemeModalTitle = page.locator('.ag-pane-titled__title');
        this.upload = page.locator('[type="file"]');
        this.image = page.locator('.ag-image-uploader-control__uploaded');
        this.appsDropdown = page.locator('span.ng-arrow-wrapper')
    };

    private informFromColumn(row: any, col: any) {
        return this.page.locator(`//tr[${row}]//td[${col}]`)
    };

    private assesType(name: string) {
        return this.page.locator(`//span[contains(., '${name}')]`);
    };

    private buttonFromTable(row: any, name: string) {
        return this.page.locator(`//tr[${row}]//span[contains(., '${name}')]`);
    };

    async clickBtnTable(row: any, name: string): Promise<void>{
        await this.buttonFromTable(row, name).click();
    };

    async checkInfoFromColumn(row: any, col: any, status: string): Promise<void> {
        await expect(await this.informFromColumn(row, col)).toHaveText(status);
    };

    async clickType(name: any): Promise<void> {
        await this.assesType(name).click();
    };

    async selectApps(name: string): Promise<void> {
        await this.appsDropdown.waitFor();
        await this.appsDropdown.click();
        await this.page.waitForTimeout(500);
        await this.assesType(name).click();
    };

    async fillThemeName(name: string): Promise<void> {
        await setValue(await this.page.locator(`#theme-name`), name);
    };

    async fillThemeUrl(url: string): Promise<void> {
        await setValue(await this.page.locator(`#theme-store-url`), url);
    };

    async fillTag(tag: string): Promise<void> {
        await setValue(await this.page.locator(`#theme-tags`), tag);
    };

    async uploadThumbnailImage(image: any): Promise<void> {
        await this.upload!.setInputFiles(image);
        await this.image.waitFor();
    };
}