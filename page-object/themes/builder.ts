import {expect, Locator, Page} from '@playwright/test';
import selectors from "./selectors";

export class BuilderPage {

    readonly page: Page;
    readonly tabbedMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tabbedMenu = this.page.frameLocator(selectors.iframeBuilder).locator('app-section-sticky');
    };

    private element(value: string) {
        return this.page.locator(`.bc-drop-element-plate [data-mat-icon-name="${value}"]`);
    };

    private builder(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container);
    };

    private addElementInSection(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container + ` app-section`);
    };

    private elementInEmptySection(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container + ` app-b-empty`);
    };

    private elementInGridSection(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container + ` app-grid-item`);
    };

    private elementInSection(container: string, element: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container + ` app-section  app-${element}`);
    };

    private sectionIsEmpty(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container + ` .b-empty-case`);
    };

    private addElementInTabs(tabName: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`//*[@class="content"][contains(., "${tabName}")]`);
    };

    private elementInBasicContainer(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container + ` app-basic-page`);
    };

    private stickyMessage(value: string) {
        return this.page.locator(`app-sticky-message .sticky-message__container >> nth=${value}`);
    };

    private breadcrumbsIcon(icon: string) {
        return this.page.locator(`app-breadcrumbs [data-mat-icon-name="${icon}"]`);
    };

    private navigationMobileMenu(element: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`app-navigation-mobile-menu app-${element}`);
    };

    async addSectionInContainer(container: string): Promise<void> {
        const section = await this.element('section');
        const body = this.builder(container);
        await body!.click();
        await section.hover();
        await this.page.mouse.down();
        const box = (await body.boundingBox());
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await body.hover();
        await this.page.mouse.up();
        await this.elementInEmptySection(container).waitFor({timeout: 50000});
    };

    async addElementsInSection(element: string, container: string): Promise<void> {
        const heading = await this.element(element);
        const body = this.addElementInSection(container);
        await body!.click();
        await this.dragAndDropElement(heading, body);
    };

    async addElementInBasicContainer(element: string, container: string): Promise<void> {
        const el = await this.element(element);
        const body = this.elementInBasicContainer(container);
        await body!.click();
        await this.dragAndDropElement(el, body);
    };

    async addOverflowBoxElementInContainer(container: string): Promise<void> {
        const overflowBox = await this.element('overflow_box');
        const body = this.builder(container);
        await this.dragAndDropElement(overflowBox, body);
        await this.elementInSection(container, 'overflow-box').waitFor({timeout: 50000});
    };

    async addElementInEmptySection(element: string, container: string): Promise<void> {
        const image = await this.element(element);
        const body = this.elementInEmptySection(container);
        await body!.click();
        await this.dragAndDropElement(image, body);
        await this.elementInSection(container, element).waitFor({timeout: 50000});
    };

    async addElementInGridSection(element: string, container: string): Promise<void> {
        const elem = await this.element(element);
        const body = this.elementInGridSection(container);
        await body!.click();
        await this.dragAndDropElement(elem, body);
    };

    async addElementInHamburgerMenu(element: string): Promise<void> {
        const elem = await this.element(element);
        const body = this.page.frameLocator(selectors.iframeBuilder).locator(`app-navigation-mobile-menu`);
        await body!.click();
        await this.dragAndDropElement(elem, body);
    };

    async waitElementInHamburgerMenu(element: string): Promise<void> {
        await this.navigationMobileMenu(element).waitFor({timeout: 50000});
    };

    async addElementInTab(elementName: string, tabName: string, container: string): Promise<void> {
        await this.page.frameLocator(selectors.iframeBuilder).locator(selectors.header)!.click();
        const element = await this.element(elementName);
        const body = this.addElementInTabs(tabName);
        await this.page.locator(selectors.body)!.click;
        await this.dragAndDropElement(element, body);
        await this.elementInSection(container, elementName).waitFor({timeout: 50000});
    };

    async addTabbedMenuInContainer(): Promise<void> {
        const tabbedMenu = await this.element('tabbed_menu');
        const body = this.page.locator('.sticky-message__container.sticky-message__container_body');
        await tabbedMenu.hover();
        await this.page.mouse.down();
        const box = (await body.boundingBox());
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await body.hover();
        await this.page.mouse.up();
        await this.tabbedMenu.waitFor({timeout: 50000});
    };

    async sectionIsVisible(container: string): Promise<void> {
        await this.sectionIsEmpty(container).isVisible();
    };

    async sectionIsHidden(container: string): Promise<void> {
        await this.sectionIsEmpty(container).isHidden();
    };

    async chooseLayer(icon: string): Promise<void> {
        await this.breadcrumbsIcon(icon).focus();
        await this.breadcrumbsIcon(icon).hover();
        await this.breadcrumbsIcon(icon).click();
    };

    async waitElementInSection(container: string, element: string): Promise<void> {
        await this.elementInSection(container, element).waitFor({timeout: 50000});
    };

    async containerIsHidden(element: string): Promise<void> {
        await this.page.locator(element).isHidden();
    };

    async containerIsVisible(element: string): Promise<void> {
        await this.page.locator(element).isVisible();
    };

    async checkNumberOfElements(element: string, number: number): Promise<void> {
        await expect(await this.page.frameLocator(selectors.iframeBuilder).locator(element)).toHaveCount(number);
    };

    async container(container: string): Promise<void> {
        await this.page.locator(`app-outline-opened .bc-node-outline-edge >> nth=${container}`).click();
    };

    async clickContainer(container: string): Promise<void> {
        await this.addElementInSection(container).click({clickCount: 3});
    };

    async returnScreenInIframe(section: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(section).screenshot();
    };

    async returnScreen(section: string) {
        return this.page.locator(section).screenshot();
    };

    async checkScreenshotInIframe(element: string, screen: string) {
        await this.page.waitForTimeout(1000);
        await expect(await this.returnScreenInIframe(element)).toMatchSnapshot({name: screen, threshold: 0.1});
    };

    async checkScreenshot(wait: string, element: string, screen: string) {
        await this.page.frameLocator(selectors.iframeBuilder).locator(wait).waitFor();
        await this.page.waitForTimeout(3000);
        await expect(await this.returnScreen(element)).toMatchSnapshot({name: screen, threshold: 0.1});
    };

    async pressAndCheckScreenshot(element: string, section: string, screen: string) {
        this.page.frameLocator(selectors.iframeBuilder).locator(section + element).click({delay: 5000});
        expect(await this.returnScreen(section)).toMatchSnapshot({name: screen, threshold: 0.1});
    };

    async dragAndDropElement(dragElement, dropElement): Promise<void> {
        if (dropElement && dropElement) {
            const dragBound = await dragElement.boundingBox();
            const dropBound = await dropElement.boundingBox();
            if (dragBound && dropBound) {
                await this.page.mouse.move(dragBound.x, dragBound.y);
                await this.page.mouse.down();
                await this.page.waitForTimeout(500);
                await this.page.mouse.move(dropBound.x,  dropBound.y);
                await this.page.waitForTimeout(500);
                await this.page.mouse.up();
                await this.page.waitForTimeout(500);
            }else {
                throw new Error ("No element");
            }
        }
    };
}