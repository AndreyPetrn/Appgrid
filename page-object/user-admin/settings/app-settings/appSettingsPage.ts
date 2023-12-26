import {Locator, Page} from '@playwright/test';
import {setValue} from "../../../methods";

export class AppSettingsPage {

    readonly page: Page;
    readonly upload: Locator;
    readonly appSettingPage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.appSettingPage = page.locator(`[class*="ag-extend ng-untouched"]`);
    };

    private input(value: string) {
        return this.page.locator(`#ag-input-${value}`);
    };

    private nameBtn(name: string){
        return this.page.locator(`//button[contains(., '${name}')]`);
    };

    async clickBtn(value: any): Promise<void> {
        await this.nameBtn(value).click();
    };

    // App title, app sub-title, description
    async fillListingField(name: string, value: any): Promise<void> {
        await setValue(await this.input(value), name);
        await this.clickBtn('Save');
    };

    async deleteAppImage(name: any, image: any): Promise<void> {
        await this.appSettingPage.waitFor();
        if (await this.page.isVisible(`//lib-form-group[contains(., "${name}")]//div[contains(@style, "background-image")]`))
        {
            await this.page.locator(`//lib-form-group[contains(., '${name}')]//mat-icon[@data-mat-icon-name='delete']`).click();
            await this.clickBtn('Save');
            await this.page.isHidden(`//lib-form-group[contains(., "${name}")]//div[contains(@style, "background-image")]`);
            await this.page.isHidden(`div.sidebar__app-icon`);
        }else {
            await this.page.locator(`//lib-form-group[contains(., "${name}")]//input`)!.setInputFiles(image);
            await this.clickBtn('Save');
            await this.page.isVisible(`//lib-form-group[contains(., "${name}")]//div[contains(@style, "background-image")]`);
            await this.page.isVisible(`div.sidebar__app-icon`);
        }
    };

    async uploadAppImage(name: any, image: any): Promise<void> {
        await this.appSettingPage.waitFor();
        if (await this.page.isVisible(`//lib-form-group[contains(., "${name}")]//div[contains(@style, "background-image")]`))
        {
            await this.page.isVisible(`//lib-form-group[contains(., "${name}")]//div[contains(@style, "background-image")]`);
        }else {
            await this.page.locator(`//lib-form-group[contains(., "${name}")]//input`)!.setInputFiles(image);
            await this.clickBtn('Save');
            await this.page.isVisible(`//lib-form-group[contains(., "${name}")]//div[contains(@style, "background-image")]`);
        }
    };
}
