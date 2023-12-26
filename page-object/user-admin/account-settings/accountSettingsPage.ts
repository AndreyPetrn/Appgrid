import {expect, Locator, Page} from '@playwright/test';
import selectors from './selectors';
import {setValue} from "../../methods";

export class AccountSettingsPage {

    readonly page: Page;
    readonly upload: Locator;
    readonly alertMessage: Locator;
    readonly deleteBtn: Locator;
    readonly imageIcon: Locator;
    readonly imageMini: Locator;
    readonly countryDropdown: Locator;
    readonly settingPage: Locator;
    readonly changesBtn: Locator;
    readonly closeAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.upload = page.locator('[type="file"]');
        this.alertMessage = page.locator('[class*=toast__conten] div');
        this.deleteBtn = page.locator('[data-mat-icon-name="delete"]');
        this.countryDropdown = page.locator('div.ag-dropdown-button__content');
        this.settingPage = page.locator('.ag-heading__h');
        this.changesBtn = page.locator('.ag-save-changes__buttons');
        this.closeAlert = page.locator('#toast-container svg');
        this.imageIcon = page.locator(selectors.imageIcon);
        this.imageMini = page.locator(selectors.imageMini);
    };

    private input(value: string) {
        return this.page.locator(`#ag-input-${value}`);
    };

    private nameBtn(name: string){
        return this.page.locator(`//button[contains(., '${name}')]`);
    };

    private country(value: string){
        return this.page.locator(`div > lib-dropdown-option:nth-child(${value})`);
    };

    async clickBtn(value: any): Promise<void> {
        await this.nameBtn(value).click();
    };

    // Full name, City, Phone, Street, Suite, State, Zip
    async fillInputField(name: string, value: any): Promise<void> {
        await setValue(await this.input(value), name);
        await this.clickBtn('Save');
    };

    async deleteImage(image: any): Promise<void> {
        await this.settingPage.waitFor();
        if (await this.page.isVisible(selectors.imageMini))
        {
            await this.deleteBtn.click();
            await this.clickBtn('Save');
            await this.page.isHidden(selectors.imageMini);
            await this.page.isHidden(selectors.imageIcon);
        }else {
            await this.upload!.setInputFiles(image);
            await this.clickBtn('Save');
            await this.page.isVisible(selectors.imageIcon);
            await this.page.isVisible(selectors.imageMini);
        }
    };

    async uploadImage(image: any): Promise<void> {
        await this.settingPage.waitFor();
        if (await this.page.isVisible(selectors.imageMini))
        {
            await this.page.isVisible(selectors.imageIcon);
        }else {
            await this.upload!.setInputFiles(image);
            await this.clickBtn('Save');
            await this.page.isVisible(selectors.imageIcon);
            await this.page.isVisible(selectors.imageMini);
        }
    };

    async checkAlertMessage(alert: any): Promise<void> {
        await expect(await this.alertMessage).toHaveText(alert);
        await this.page.waitForTimeout(500);
        await this.closeAlert.click();
    };

    async selectCountry(value: any): Promise<void> {
        await this.countryDropdown.waitFor();
        await this.countryDropdown.click();
        await this.country(value).click();
        await this.clickBtn('Save');
    };

    async fillPassword(name: string, value: any): Promise<void> {
        await setValue(await this.input(value), name);
    };
}
