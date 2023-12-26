import { Page } from '@playwright/test';
import selectors from "./selectors";

export class LayoutElements {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    private section(container: string, number: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container + ` app-section >> nth=${number}`);
    };

    async clickOnSection(container: string, number: string): Promise<void> {
        await this.section(container, number).hover();
        await this.section(container, number).click();
    };
}