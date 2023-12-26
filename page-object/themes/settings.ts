import { Locator, Page, expect } from '@playwright/test';
import selectors from "./selectors";
import { setValue } from "../methods";

let data = require('../data-page.json').Themes.Builder;

export class Settings {
    readonly page: Page;
    readonly dropdownLinkTo: Locator;
    readonly cornerRadiusDropdown: Locator;
    readonly pageName: Locator;
    readonly internalTitle: Locator;
    readonly productDropdown: Locator;
    readonly nodeBindingBasicDropdown: Locator;
    readonly nodeBindingProductDropdown: Locator;
    readonly nodeBindingWithVariantProduct: Locator;
    readonly actionsDropdown: Locator;
    readonly anchorSearch: Locator;
    readonly shadowColor: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdownLinkTo = page.locator('app-link-input [class="ng-input"]');
        this.cornerRadiusDropdown = page.locator('app-node-corner-radius button');
        this.pageName = page.locator('app-header-pager-common span');
        this.internalTitle = page.locator('app-page-settings-common [type="text"]');
        this.productDropdown = page.locator('app-node-product-selector .ng-select-container');
        this.nodeBindingBasicDropdown = page.locator('app-node-binding .ng-select-container');
        this.nodeBindingProductDropdown = page.locator('app-product-identifier-selector .ng-select-container');
        this.nodeBindingWithVariantProduct = page.locator('ng-dropdown-panel .bc-option-label.with-variant >> nth=0');
        this.actionsDropdown = page.locator('app-node-button-actions-control .ng-select-container');
        this.anchorSearch = page.locator('//*[@dir="ltr"]//input');
        this.shadowColor = page.locator('app-node-box-shadow .solid__color');
    };

    private alignment(location: string) {
        return this.page.locator(`.bc-alignment-control__container_${location}`);
    };

    private transformDropdown(number: string) {
        return this.page.locator(`app-node-transform button >> nth=${number}`);
    };

    private margin(location: string) {
        return this.page.locator(`.bc-position-control__label_margin-${location}`);
    };

    private padding(location: string) {
        return this.page.locator(`.bc-position-control__label_padding-${location}`);
    };

    private sizeInput(value: string) {
        return this.page.locator(`.bc-input-container_icon input >> nth=${value}`);
    };

    private chooseIndicator(value: string) {
        return this.page.locator(`.cdk-overlay-pane .mat-focus-indicator >> nth=${value}`);
    };

    private sizeDropdown(value: string) {
        return this.page.locator(`.bc-input-container_icon .mat-menu-trigger >> nth=${value}`);
    };

    private block(name: string) {
        return this.page.locator(`//span[text()='${name}']/following::div[1]`);
    };

    private pages(pageName: string) {
        return this.page.locator(`//*[@class="bc-select-title ng-star-inserted"][contains(., "${pageName}")]`);
    };

    private backgroundBlock(blockName: string) {
        return this.page.locator(`//*[@class="bc-button-group"]//span[contains(., "${blockName}")]`);
    };

    private backgroundSettings(value: string) {
        return this.page.locator(`app-node-background [placeholder="${value}"] + div`);
    };

    private settingsBtn(value: string) {
        return this.page.locator(`app-page-settings-common .mat-slide-toggle-bar >> nth=${value}`);
    };

    private borderSettings(value: string) {
        return this.page.locator(`app-node-border ${value}`);
    };

    private cornerRadiusSettings(value: string) {
        return this.page.locator(`app-node-corner-radius ${value}`);
    };

    private options(element: string, options: string) {
        return this.page.locator(`app-node-${element}-options .mat-slide-toggle-bar >> nth=${options}`);
    };

    private optionsInput(element: string, options: string) {
        return this.page.locator(`app-node-${element}-options [type="text"] >> nth=${options}`);
    };

    private matTabLabels(value: string) {
        return this.page.locator(`//span[contains(., "${value}")]`);
    };

    private chooseProduct(value: string) {
        return this.page.locator(`//ng-dropdown-panel//span//*[contains(., "${value}")]`);
    };

    private gridOption(number: string) {
        return this.page.locator(`app-node-grid-options [placeholder="${number}"]`);
    };

    private nodeBinding(value: string) {
        return this.page.locator(`//*[@class="simplebar-wrapper"]//span[text()='${value}']`);
    };

    private actionsPageActive(value: string) {
        return this.page.locator(`//ng-dropdown-panel//*[contains(., "${value}")]/mat-icon[@data-mat-icon-name="check_mark"]`);
    };

    private actionOptions(value: string) {
        return this.page.locator(`//*[@class="bc-options-menu__content"]/button[contains(., "${value}")]`);
    };

    private anchorElement(container: string, element: string) {
        return this.page.locator(`//*[@dir="ltr"]//app-anchor-tree-item[contains(., "${container}")]//app-anchor-tree-item[contains(., "${element}")]`);
    };

    private dropdownInLayers(element: string) {
        return this.page.locator(`//*[contains(., "${element}")]/*[contains(@class, "bc-tree-item-node__arrow")]/span`);
    };

    private elementInLayers(element: string, number: string) {
        return this.page.locator(`//*[@class="bc-tree-item-node__title"][contains(., "${element}")] >> nth=${number}`);
    };

    private alignmentPosition(element: string) {
        return this.page.locator(`app-node-margin-align [data-mat-icon-name*="${element}"]`);
    };

    private icon(element: string, number: string) {
        return this.page.locator(`[data-mat-icon-name*="${element}"] >> nth=${number}`);
    };

    private transformContent(element: string, number: string) {
        return this.page.locator(`[data-mat-icon-name*="${element}"] >> nth=${number}`);
    };

    private transformInput(section: string) {
        return this.page.locator(`//app-node-transform//*[contains(@class, "bc-option-group")][contains(., "${section}")]//input`);
    };

    private shadowInput(section: string) {
        return this.page.locator(`//app-node-box-shadow//*[contains(@class, "bc-option-group")][contains(., "${section}")]//input`);
    };

    private effectsInput(section: string) {
        return this.page.locator(`//app-node-opacity-filter//*[contains(@class, "bc-option-group")][contains(., "${section}")]//input`);
    };

    private pressingEffectsInput(section: string) {
        return this.page.locator(`//app-node-press-effect//*[contains(@class, "bc-option-group")][contains(., "${section}")]//input`);
    };

    private actions(section: string) {
        return this.page.locator(`//lib-dynamic-dialog-root//button[contains(., "${section}")]`);
    };

    async alignmentSection(location: string): Promise<void> {
        await this.alignment(location).click();
    };

    async sizeSection(widthIndicator: string, heightIndicator: string, width: string, height: string): Promise<void> {
        await this.sizeDropdown('0').click();
        await this.chooseIndicator(widthIndicator).click();
        await setValue(this.sizeInput('0'), width);

        await this.sizeDropdown('1')!.click();
        await this.chooseIndicator(heightIndicator).click();
        await setValue(this.sizeInput('1'), height);
    };

    async openSection(section: string, click: number): Promise<void> {
        await this.block(section).click({clickCount: click});
    };

    async linkToSection(pageName: string): Promise<void> {
        await this.dropdownLinkTo!.click();
        const choosePage = await this.pages(pageName);
        await choosePage.focus();
        await choosePage.click();
    };

    async backgroundSection(blockName: string): Promise<void> {
        await this.block('Background').click();
        await this.backgroundBlock(blockName)!.click();
    };

    async waitUploadImageInBackground(image: string): Promise<void> {
        await this.page.locator(`[style*="car-${image}"]`).waitFor()
    };

    async backgroundColor(section: string, value: string): Promise<void> {
        const input = this.backgroundSettings(section);
        await setValue(await input, value);
        await input?.press('Enter');
    };

    async borderSection(borderValue: string, colorValue: string): Promise<void> {
        const size = await this.borderSettings('[placeholder="0"]');
        await setValue(await size, borderValue);

        const color = this.borderSettings('[placeholder="transparent"] + div');
        await setValue(await color, colorValue);
        await color?.press('Enter');
    };

    async cornerRadiusSection(indicator: string, cornerRadiusValue: string): Promise<void> {
        await this.cornerRadiusDropdown!.click();
        await this.chooseIndicator(indicator)!.click();

        const size = await this.cornerRadiusSettings('[placeholder="0"]');
        await setValue(await size, cornerRadiusValue);
        await size?.press('Enter');
    };

    async pageSettings(header: number, footer: number): Promise<void> {
        await this.settingsBtn('0').hover();
        await this.settingsBtn('0').click({clickCount: header});
        await this.settingsBtn('1').hover();
        await this.settingsBtn('1').click({clickCount: footer});
    };

    async updatePageTitle(pageName: string): Promise<void> {
        await setValue(this.internalTitle, pageName);
        await this.internalTitle?.press('Enter');
    };

    async footerIsHidden(): Promise<void> {
        await this.page.locator(selectors.footer).isHidden();
    };

    async headerIsHidden(): Promise<void> {
        await this.page.locator(selectors.header).isHidden();
    };

    async checkPageTitle(title: string): Promise<void> {
        await expect(await this.pageName).toHaveText(title);
    };

    async optionsSection(element: string, checkbox: string): Promise<void> {
        await this.options(element, checkbox).focus();
        await this.options(element, checkbox).click();
    };

    async fillOptionsInput(element: string, input: string, data: string): Promise<void> {
        await this.optionsInput(element, input).click();
        const section = await this.optionsInput(element, input);
        await setValue(section, data);
        await section?.press('Enter');
    };

    async openMatTabLabels(button: string): Promise<void> {
        await this.matTabLabels(button).click();
    };

    async productSettings(product: string): Promise<void> {
        await this.productDropdown.click();
        await this.chooseProduct(product).click();
    };

    async fillGridOption(page: string, row: string): Promise<void> {
        await setValue(await this.gridOption('16'), page);
        await setValue(await this.gridOption('1'), row);
        await this.gridOption('1').press('Enter');
    };

    async nodeBindingSettingsOneValue(basicContainer: string): Promise<void> {
        await this.nodeBindingBasicDropdown.click();
        await this.nodeBinding(basicContainer).click();
    };

    async nodeBindingSettings(basicContainer: string, product: string): Promise<void> {
        await this.nodeBindingBasicDropdown.click();
        await this.nodeBinding(basicContainer).click();
        await this.nodeBindingProductDropdown.click();
        await this.nodeBinding(product).click();
        if('Alpine' === product) {
            await this.nodeBindingWithVariantProduct.click();
        }
    };

    async fillActionsOption(content: string): Promise<void> {
        await this.actionsDropdown.click();
        await this.nodeBinding(content).click();
    };

    async checkActiveOptionsInActions(name: string): Promise<void> {
        await this.actionsDropdown.click();
        await this.actionsPageActive(name).isVisible();
    };

    async openActionsSection(value: string): Promise<void> {
        await this.openSection('Actions', 1);
        await this.actionOptions(value).click();
    };

    async fillAnchorOption(search: string, container: string, element: string): Promise<void> {
        await this.page.locator('app-node-button-actions-control .bc-anchor-point-selector__button').click()
        await setValue(await this.anchorSearch, search);
        await this.anchorElement(container, element).click();
    };

    async openDropdownInLayers(element: string,): Promise<void> {
        await this.dropdownInLayers(element).click();
    };

    async selectElementInLayers(element: string, number: string): Promise<void> {
        await this.elementInLayers(element, number).click();
    };

    async alignmentPositionBtn(element: string): Promise<void> {
        await this.alignmentPosition(element).click();
    };

    async duplicateElementInLayers(element: string, number: string): Promise<void> {
        await this.elementInLayers(element, number).hover();
        await this.elementInLayers(element, number).click();
        await this.icon('duplicate', number).click();
    };

    async deleteElementInLayers(element: string, number: string): Promise<void> {
        await this.elementInLayers(element, number).hover();
        await this.elementInLayers(element, number).click();
        await this.icon('delete', number).click();
    };

    async fillMargin(top: string, right: string, bottom: string, left: string): Promise<void> {
        await this.margin('top').click();
        await this.margin('top').type(top);
        await this.margin('top')?.press('Enter');

        await this.margin('right').click();
        await this.margin('right').type(right);
        await this.margin('right')?.press('Enter');

        await this.margin('bottom').click();
        await this.margin('bottom').type(bottom);
        await this.margin('bottom')?.press('Enter');

        await this.margin('left').click();
        await this.margin('left').type(left);
        await this.margin('left')?.press('Enter');
    };

    async fillPadding(top: string, right: string, bottom: string, left: string): Promise<void> {
        await this.padding('top').click();
        await this.padding('top').type(top);
        await this.padding('top')?.press('Enter');

        await this.padding('right').click();
        await this.padding('right').type(right);
        await this.padding('right')?.press('Enter');

        await this.padding('bottom').click();
        await this.padding('bottom').type(bottom);
        await this.padding('bottom')?.press('Enter');

        await this.padding('left').click();
        await this.padding('left').type(left);
        await this.padding('left')?.press('Enter');
    };

    async transformSettings(indicator: string, moveHorizontal: string, moveVertical: string, scale: string, rotate: string): Promise<void> {
        await this.transformDropdown('0').click();
        await this.chooseIndicator(indicator)!.click();
        await setValue(await this.transformInput('Move Horizontal'), moveHorizontal);
        await this.transformDropdown('1').click();
        await this.chooseIndicator(indicator)!.click();
        await setValue(await this.transformInput('Move Vertical'), moveVertical);
        await setValue(await this.transformInput('Scale'), scale);
        await setValue(await this.transformInput('Rotate'), rotate);
    };

    async shadowSettings(color: string, horizontalLength: string, verticalLength: string, blur: string, spread: string): Promise<void> {
        const input = await this.shadowColor;
        await input.type(color);
        await input?.press('Enter');
        await setValue(await this.shadowInput('Horizontal Length'), horizontalLength);
        await setValue(await this.shadowInput('Vertical Length'), verticalLength);
        await setValue(await this.shadowInput('Blur'), blur);
        await setValue(await this.shadowInput('Spread'), spread);
    };

    async effectsSettings(opacity: string, blur: string, backgroundBlur: string): Promise<void> {
        await setValue(await this.effectsInput('Opacity'), opacity);
        await setValue(await this.effectsInput('Blur'), blur);
        await setValue(await this.effectsInput('Background blur'), backgroundBlur);
    };

    async pressingEffectsSettings(scale: string, opacity: string, animationDuration: string, animationFunction: string): Promise<void> {
        await setValue(await this.pressingEffectsInput('Scale'), scale);
        await setValue(await this.pressingEffectsInput('Opacity'), opacity);
        await setValue(await this.pressingEffectsInput('Animation Duration'), animationDuration);
        await setValue(await this.pressingEffectsInput('Animation Function'), animationFunction);
    };

    async selectActions(element: string, value: string): Promise<void> {
        if(element === 'Go back') {
            await this.actions(element).click();
        }else {
            await this.actions(element).click();
            await this.actionsDropdown.click();
            await this.nodeBinding(value).click();
        }
    };

    async selectAnchorPointInActions(value: string): Promise<void> {
        await this.actions('Anchor').click();
        await this.page.locator('app-anchor-point-selector').click();
        await this.nodeBinding(value).click();
    };

    async zoom(value: string): Promise<void> {
        await this.page.evaluate(`document.body.style.zoom=${value}`)
    };
}