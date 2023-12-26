import { Locator, Page } from '@playwright/test';
import { setValue } from "../methods";

export class LoginPage {

    readonly page: Page;
    readonly sidebarFooter: Locator;
    readonly logout: Locator;
    readonly errorMessage: Locator;
    readonly loginBtn: Locator;
    readonly sidebar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebarFooter = page.locator('.sidebar-footer .sidebar-footer__action');
        this.logout = page.locator('[svgicon*=log_out]');
        this.errorMessage = page.locator('[class*=toast-message]');
        this.loginBtn = page.locator('button[class*="login__button"]');
        this.sidebar = page.locator('.sidebar__nav');
    };

    private input(value: string) {
        return this.page.locator(`[type="${value}"]`);
    };

    async login(user): Promise<void> {
        await this.fillUserName(await user.email);
        await this.fillUserPassword(await user.password);
        await this.clickLogin();
    };

    async loginWithWrongPassword(email: string, password: string): Promise<void> {
        await setValue(await this.input('email'), email);
        await setValue(await this.input('password'), password);
        await this.clickLogin();
    };

    async logoutUserAdmin(): Promise<void> {
        await this.sidebarFooter.waitFor();
        await this.sidebarFooter.click();
        await this.logout.waitFor();
        await this.logout.click();
    };

    async fillUserName(adminName: string): Promise<void> {
        await setValue(await this.input('email'), adminName);
    };

    async fillUserPassword(pass: string): Promise<void> {
        await setValue(await this.input('password'), pass);
    };

    async clickLogin(): Promise<void> {
        await this.loginBtn.click();
    };
}