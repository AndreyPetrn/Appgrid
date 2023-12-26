import { expect, Locator, Page } from '@playwright/test';
import { setValue } from "../methods";
import selectors from "./selectors";

let data = require('../data-page.json').Themes.Builder.LeftSidebar;

export class LeftSidebarElements {
    readonly page: Page;
    readonly searchElementInput: Locator;
    readonly searchPage: Locator;
    readonly clearSearchInputBtn: Locator;
    readonly commonPageBtn: Locator;
    readonly pageTitle: Locator;
    readonly previewBtn: Locator;
    readonly upload: Locator;
    readonly confirmationDialog: Locator;
    readonly deleteImage: Locator;
    readonly assetsTitle: Locator;
    readonly fontFamilyDropdown: Locator;
    readonly manageFont: Locator;
    readonly searchFont: Locator;
    readonly sizeInput: Locator;
    readonly heightInput: Locator;
    readonly buttonContainer: Locator;
    readonly colorInput: Locator;
    readonly backgroundContainer: Locator;
    readonly safeAreaDropdown: Locator;
    readonly closeManageFontsBtn: Locator;
    readonly previewOpened: Locator;
    readonly previewClosed: Locator;
    readonly searchedElement: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchElementInput = page.locator('[placeholder="Search"]');
        this.searchPage = page.locator('[class*="bc-header"] [placeholder="Search"]');
        this.clearSearchInputBtn = page.locator('.bc-search-input__icon mat-icon');
        this.commonPageBtn = page.locator('app-header-pager-common');
        this.pageTitle = page.locator('.bc-header-pager-page__title');
        this.previewBtn = page.locator('app-header-history + button');
        this.upload = page.locator('app-image-uploader [type="file"]');
        this.confirmationDialog = page.locator('app-confirmation-dialog span');
        this.deleteImage = page.locator('.bc-button_gray-dark');
        this.assetsTitle = page.locator('app-assets .bc-left-sidebar-title');
        this.fontFamilyDropdown = page.locator('.bc-left-sidebar-content [placeholder="Font Family"] .ng-arrow-wrapper');
        this.manageFont = page.locator('.ng-option__font-option.manage');
        this.searchFont = page.locator('app-font-book [placeholder="Search"]');
        this.sizeInput = page.locator('.bc-left-sidebar-content app-node-typography app-unit-input [class="bc-shift-icon bc-shift-icon_up"]');
        this.heightInput = page.locator('//app-sidebar-left-content//input[@placeholder="1"]');
        this.buttonContainer = page.locator('//app-sidebar-left-content//div[@class="button-container__color"]');
        this.colorInput = page.locator('.color-picker__container [placeholder="transparent"]');
        this.backgroundContainer = page.locator('//app-sidebar-left-content//app-node-background[contains(., "Background")]//mat-icon');
        this.safeAreaDropdown = page.locator(`//app-node-safe-area//ng-select//span[@class="ng-arrow-wrapper"]`);
        this.closeManageFontsBtn = page.locator('.bc-font-book__close [data-mat-icon-name="cross"]');
        this.previewOpened = page.locator('.bc-base-container_preview-mode');
        this.previewClosed = page.locator('[class="bc-base-container"]');
        this.searchedElement = page.locator('.bc-tree-item-node__title_active');
    };

    private pageName(value: string) {
        return this.page.locator(`[data-mat-icon-name="${value}"]`);
    };

    private checkImageInPopup(number: string) {
        return this.page.locator(`.popup-image[src*="car-${number}"]`);
    };

    private checkImageInSimplebar(number: string) {
        return this.page.locator(`ngx-simplebar [style*="car-${number}"]`);
    };

    private installFont(font: string) {
        return this.page.locator(`//app-font-book-item[contains(., "${font}")]//button[contains(., "Install")]`);
    };

    private uninstallFont(font: string) {
        return this.page.locator(`//app-font-book-item[contains(., "${font}")]//button[contains(., "Uninstall")]`);
    };

    private font(font: string) {
        return this.page.locator(`//*[contains(@class,"ng-option__font-option")][contains(., "${font}")]`);
    };

    private safeAreaMode(value: string) {
        return this.page.locator(`//ng-dropdown-panel/div/div/div[contains(., "${value}")]`);
    };

    private solidPattern(container: string) {
        return this.page.locator(`//app-sidebar-left-content//*[@class="bc-basic-control__header"][contains(.,"${container}")]/following::div[1]//*[contains(@class,"solid__color")]`);
    };

    private keyboardShortcuts(value: string) {
        return this.page.locator(`//div[text()='${value}']/following::div[1]`);
    };

    private outlineSelected(element: string) {
        return this.page.locator(`//app-outline-selected//div[text()='${element}']`);
    };

    private treeActions(value: string) {
        return this.page.locator(`//a[text()='${value}']`);
    };

    private preBuildBlock(value: string) {
        return this.page.locator(`//span[text()='${value}']`);
    };

    private preBuildElement(element: string) {
        return this.page.locator(`[alt="PB ${element}"]`);
    };

    private element(value: string) {
        return this.page.locator(`.bc-drop-element-plate [data-mat-icon-name="${value}"]`);
    };

    async searchElement(elementName): Promise<void> {
        await setValue(await this.searchElementInput, elementName);
    };

    async changePage(pageName): Promise<void> {
        await this.commonPageBtn.click();
        await setValue(await this.searchPage, pageName);
        await this.pageTitle.click();
    };

    async clearSearchInput(): Promise<void> {
        await this.clearSearchInputBtn.click();
    };

    async openPreview(): Promise<void> {
        await this.previewBtn.click();
    };

    async openSidebar(pageName: string): Promise<void> {
        await this.pageName(pageName).click();
    };

    async uploadImage(image: any): Promise<void> {
        await this.upload!.setInputFiles(image);
    };

    async checkUploadedImage(number: string): Promise<void> {
        await this.page.locator('.bc-image-uploader-host').waitFor();
        await this.page.locator('.bc-image-uploader-host').isHidden();
        await this.checkImageInSimplebar(number).waitFor({timeout: 50000});
    };

    async zoomImage(): Promise<void> {
        await this.page.locator(`.drag-images__image >> nth=0`).isVisible();
        await this.page.locator(`.drag-images__image >> nth=0`).hover();
        await this.page.locator('[data-mat-icon-name="zoom"] >> nth=0').click();
    };

    async checkPopup(number: string): Promise<void> {
        await this.checkImageInPopup(number).waitFor();
    };

    async deleteAllAssets(): Promise<void> {
        await this.assetsTitle.waitFor({timeout: 50000});
        await expect(await this.assetsTitle).toHaveText(data.assetsTitle);
        await this.page.waitForTimeout(2000);
        while(!(await this.page!.isHidden('.drag-images__image >> nth=0'))){
            await this.page.locator(`.drag-images__image >> nth=0`).isVisible();
            await this.page.locator(`.drag-images__image >> nth=0`).hover();
            await this.page.locator('[data-mat-icon-name="delete_1"] >> nth=0').click();
            await expect(await this.confirmationDialog).toHaveText(data.confirmationDialog);
            await this.deleteImage.click();
            await this.page.waitForTimeout(500); // wait to update data
        }
    };

    async openManageFonts(): Promise<void> {
        await this.fontFamilyDropdown.click();
        await this.manageFont.click();
    };

    async installFonts(font: string): Promise<void> {
        await setValue(await this.searchFont, font);
        if(!(await this.uninstallFont(font)!.isVisible)) {
            await this.uninstallFont(font).click();
        }
        await this.installFont(font).click();
    };

    async selectFont(font: string): Promise<void> {
        await this.font(font).click();
    };

    async size(): Promise<void> {
        await this.sizeInput.hover();
        await this.sizeInput.click({clickCount: 4});
    };

    async height(height: string): Promise<void> {
        await setValue(await this.heightInput, height);
        await this.heightInput?.press('Enter');
    };

    async color(color: string): Promise<void> {
        await this.buttonContainer.click();
        await setValue(await this.colorInput, color);
        await this.colorInput?.press('Enter');
    };

    async background(color: string): Promise<void> {
        await this.backgroundContainer.click();
        await this.solidPattern('Background').click();
        await setValue(await this.colorInput, color);
        await this.colorInput?.press('Enter');
    };

    async safeAreaTop(color: string): Promise<void> {
        await this.solidPattern('top').click();
        await setValue(await this.colorInput, color);
        await this.colorInput?.press('Enter');
    };

    async safeAreaBottom(value: string, color: string): Promise<void> {
        await this.safeAreaDropdown.click();
        await this.safeAreaMode(value).click();
        await this.solidPattern('bottom').click();
        await setValue(await this.colorInput, color);
        await this.colorInput?.press('Enter');
    };

    async closeManageFonts(): Promise<void> {
        await this.closeManageFontsBtn.click();
    };

    async checkKeyboardGeneral(value: string, hotkey: string): Promise<void> {
        await this.keyboardShortcuts(value).waitFor();
        await expect(await this.keyboardShortcuts(value)).toHaveText(hotkey);
    };

    async hotkey(hotkey: string): Promise<void> {
        await this.page.waitForTimeout(1000); // for stability
        await this.page.keyboard.press(hotkey);
    };

    async checkPreviewOpened(): Promise<void> {
        await this.previewOpened.isVisible();
    };

    async checkPreviewClosed(): Promise<void> {
        await this.previewClosed.isVisible();
    };

    async checkOutlineSelected(element: string): Promise<void> {
        await this.outlineSelected(element).waitFor();
    };


    async clickTreeActions(value: string): Promise<void> {
        await this.treeActions(value).click();
    };

    async checkNumberOfElements(element: string, number: number): Promise<void> {
        await expect(await this.page.locator(element)).toHaveCount(number);
    };

    async selectElementInLayers(): Promise<void> {
        await this.searchedElement.click();
    };

    async selectPreBuildBlock(block: string): Promise<void> {
        await this.preBuildBlock(block).hover();
    };

    async addPreBuildBlockInContainer(block: string, container: string): Promise<void> {
        const element = this.preBuildElement(block);
        const body = this.page.frameLocator(selectors.iframeBuilder).locator(container);
        await element.hover();
        await this.page.mouse.down();
        const box = (await body.boundingBox());
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await body.hover();
        await this.page.mouse.up();
    };

    async checkElementFound(block: string): Promise<void> {
        await this.element(block).waitFor();
    };
}