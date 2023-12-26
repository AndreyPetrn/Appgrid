import { expect, Locator, Page } from '@playwright/test';
import selectors from "./selectors";
import { setValue } from "../methods";

let data = require('../data-page.json').Themes.Builder.Settings;

export class MediaElements {
    readonly page: Page;
    readonly upload: Locator;
    readonly code: Locator;
    readonly search: Locator;
    readonly videoUrl: Locator;
    readonly codeTitle: Locator;
    readonly selectTemplateInput: Locator;
    readonly backToSliderBtn: Locator;
    readonly selectDifferentPlatform: Locator;
    readonly deleteSlide: Locator;
    readonly video: Locator;
    readonly useAssetsBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.upload = page.locator('[type="file"]');
        this.code = page.locator('.bc-textarea');
        this.search = page.locator('.bc-icon-popup__content [placeholder="Search"]');
        this.videoUrl = page.locator('app-node-input-text input');
        this.codeTitle = page.locator('[title="Code"] .bc-basic-control__header__title');
        this.selectTemplateInput = page.locator('app-node-template-selector button');
        this.backToSliderBtn = page.locator('.bc-basic-control__back');
        this.selectDifferentPlatform = page.locator('app-image-select-button button');
        this.deleteSlide = page.locator('app-node-slides-list [data-mat-icon-name*="delete"] >> nth=0');
        this.video = page.locator('[placeholder*="https://www.youtube.com/watch?"]');
        this.useAssetsBtn = page.locator('.bc-assets-button__button-elem-light');
    };

    private elementInSection(value: string, element: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${value} app-${element}`);
    };

    private contentMenuDropdown(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-content-menu-dropdown`);
    };

    private iconName(value: string) {
        return this.page.locator(`[data-mat-icon-name*="${value}"]`);
    };

    private iconSettings(value: string) {
        return this.page.locator(`.bc-icon-options ${value}`);
    };

    private templateContainer(value: string) {
        return this.page.locator(`.template-images__item [alt="thumbnail_gallery_${value}"]`);
    };

    private openSlider(container: string) {
        return this.page.locator(`//*[@class="bc-items-box__title"][contains(., "Slide ${container}")]`);
    };

    private tabsNavigation(tabNumber: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`//app-text >> nth=${tabNumber}`);
    };

    private videoPlatform(platform: string) {
        return this.page.locator(`[class*="entity__image video-platform video-platform_image-${platform}"]`);
    };

    private dots(container: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-dots div`);
    };

    private assetsImages(number: string) {
        return this.page.locator(`.assets-images__image[style*="car-${number}"]`);
    };

    async uploadImage(container: string, element: string, image: any): Promise<void> {
        await this.elementInSection(container, element).click();
        await this.upload!.setInputFiles(image);
    };

    async checkImagesCar(container: string, element: string, image: string): Promise<void> {
        await this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-${element} [src*="car-${image}"]`).waitFor({timeout: 50000});
    };

    async checkVideo(container: string, video: string): Promise<void> {
        await this.page.frameLocator(selectors.iframeBuilder).locator(`${container} [title="${video}"]`).waitFor({timeout: 50000})
    };

    async openContentMenuDropdown(container: string, clickCount: number): Promise<void> {
        await this.contentMenuDropdown(container).click({clickCount: clickCount});
    };

    async closeContentMenuDropdown(container: string, clickCount: number): Promise<void> {
        await this.contentMenuDropdown(container).click({clickCount: clickCount});
    };

    async fillCode(): Promise<void> {
        await setValue(await this.code, data.code);
        await this.codeTitle.click();
    };

    async checkCode(): Promise<void> {
        await this.page.frameLocator(selectors.iframeBuilder).locator(selectors.checkCode);
    };

    async fillOverflowBox(position: string): Promise<void> {
        await this.page.locator(`[data-mat-icon-name="${position}"]`).click();
    };

    async fillIconData(sizeValue: string, colorValue: string): Promise<void> {
        const size = await this.iconSettings('[placeholder="0"]');
        await setValue(size, sizeValue);
        const color = await this.iconSettings('[placeholder="transparent"] + div');
        await setValue(color, colorValue);
        await color?.press('Enter');
    };

    async chooseIcon(icon: string, container: string): Promise<void> {
        await this.iconSettings('.mat-menu-trigger.bc-icon-selector').click();
        await setValue(await this.search, icon);
        await this.iconName(icon).click();
        await this.page.frameLocator(selectors.iframeBuilder).locator(selectors.body).click();
        await this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-section  app-icon`).click();
    };

    async chooseIcons(icon: string): Promise<void> {
        await this.iconSettings('.mat-menu-trigger.bc-icon-selector').click();
        await setValue(await this.search, icon);
        await this.iconName(icon).click();
    };

    async selectTemplate(container: string): Promise<void> {
        await this.selectTemplateInput.click();
        await this.templateContainer(container).click();
    };

    async openSliders(container: string): Promise<void> {
        await this.openSlider(container).click()
    };

    async backToSlider(): Promise<void> {
        await this.backToSliderBtn.click();
    };

    async fillTabsData(tabNumber: string, textData: string): Promise<void> {
        const tabContainer = await this.tabsNavigation(tabNumber);
        await tabContainer.click({clickCount: 3});
        await setValue(tabContainer, textData);
    };

    async settingsVideo(choosePlatform: string, url: string): Promise<void> {
        await this.selectDifferentPlatform.click();
        await this.videoPlatform(choosePlatform).click();
        await setValue(await this.videoUrl, url);
        await this.videoUrl.press('Enter');
        await this.video.waitFor({timeout: 50000});
    };

    async clickOnIcon(container: string): Promise<void> {
        await this.page.frameLocator(selectors.iframeBuilder).locator(`[data-mat-icon-name*="${container}"]`).click();
    };

    async clickOnImage(container: string, element: string, image: string): Promise<void> {
        await this.page.frameLocator(selectors.iframeBuilder).locator(`${container} app-${element} [src*="car-${image}"]`).click();
    };

    async checkTabsData(titleNumber: string, bodyNumber: string, textTitle: string, textBody: string): Promise<void> {
        const title = await this.tabsNavigation(titleNumber);
        await title.click();
        await expect(title).toHaveText(textTitle);
        await expect(await this.tabsNavigation(bodyNumber)).toHaveText(textBody);
    };

    async checkDots(container: string, number: number): Promise<void> {
        await this.page.waitForTimeout(2000);
        await expect(await this.dots(container)).toHaveCount(number);
    };

    async deleteAllSlide(): Promise<void> {
        while(!(await this.page.frameLocator(selectors.iframeBuilder).locator(`//app-slider[contains(., "Add a slide")] `).isVisible())){
            await this.deleteSlide.click();
            await this.page.waitForTimeout(1000);
        }
    };

    async checkElementInSection(container: string, element: string): Promise<void> {
        await this.elementInSection(container, element).waitFor({timeout: 50000});
    };

    async selectImage(number: string): Promise<void> {
        await this.useAssetsBtn.click();
        await this.assetsImages(number).click();

    };
}