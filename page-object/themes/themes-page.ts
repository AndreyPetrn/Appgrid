import { expect, Locator, Page } from '@playwright/test';
import { setValue } from "../methods";

export class ThemesPage {

    readonly page: Page;
    readonly themeInLibraryText: Locator;
    readonly currentThemeName: Locator;
    readonly themePage: Locator;
    readonly createThemeBtn: Locator;
    readonly key: Locator;
    readonly importTheme: Locator;
    readonly importModal: Locator;
    readonly importBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.themeInLibraryText = page.locator('div[class*="ag-font-weight-"]');
        this.currentThemeName = page.locator('.theme__theme-title span >> nth=0');
        this.themePage = page.locator('app-themes [class*="ag-font-weight"]');
        this.createThemeBtn = page.locator('.ag-button_blue');
        this.key = page.locator('#ag-input-2');
        this.importTheme = page.locator('#ag-input-1');
        this.importModal = page.locator('[class*=menu__content]');
        this.importBtn = page.locator(`//div[contains(@class, 'mat-menu-content')]/ancestor::div//button`);
    };

    private themeSettingsBtn(value: string, number: string) {
        return this.page.locator(`[data-mat-icon-name="${value}"] >> nth=${number}`);
    };

    private iconName(value: string) {
        return this.page.locator(`[data-mat-icon-name*="${value}"]`);
    };

    private input(value: string) {
        return this.page.locator(`input[placeholder="${value}"]`);
    };

    async fillThemeKey(value: string) {
        await setValue(await this.importTheme, value);
        await this.importBtn.click();
    };

    async createTheme(name: any, button: string, number: string): Promise<void> {
        await this.createThemeBtn.click();
        await this.renameTheme(name);
        await this.themeSettings(button, number);
    };

    async renameTheme(name: any): Promise<void> {
        await this.themePage.waitFor({timeout: 50000});
        await this.themeSettings('edit', '1')
        const themeNameInput = await this.input('Theme name');
        await setValue(themeNameInput, name);
        await this.iconName('checkbox_thin').click();
    };

    async themeSettings(button: string, number: string): Promise<void> {
        await this.themeSettingsBtn(button, number).click();
    };

    async checkUsedTheme(themeName: any): Promise<void> {
        await expect(await this.currentThemeName).toHaveText(themeName);
    };

    async deleteThemes(): Promise<void> {
        await this.themePage.waitFor({timeout: 50000});
        while(!(await this.page!.isVisible('//app-themes[contains(., "You have 0")]'))){
            await this.themeSettings('delete', '0');
            await this.page.waitForTimeout(500); // wait to update data
        }
    };

    async addTheme(value: any): Promise<void> {
        await this.page.waitForSelector(`//span[contains(., '${value}')]`);
        await this.page.locator(`//span[contains(., '${value}')]//ancestor::*[@class="theme__theme-title ag-border-top"]//button`).click();
    };
}