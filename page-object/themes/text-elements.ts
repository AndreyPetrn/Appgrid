import { expect, Locator, Page } from '@playwright/test';
import { setValue } from '../methods';
import selectors from "./selectors";

export class TextElements {
    readonly page: Page;
    readonly chooseColor: Locator;

    constructor(page: Page) {
        this.page = page;
        this.chooseColor = page.locator('.button-container__item_color');
    };

    private elementInSection(container: string, element: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(container + ` app-${element}`);
    };

    private iconName(value: string) {
        return this.page.locator(`[data-mat-icon-name*="${value}"]`);
    };

    private input(value: string) {
        return this.page.locator(`[placeholder="${value}"]`);
    };

    private checkStyle(value: string) {
        return this.page.frameLocator(selectors.iframeBuilder).locator(`.b_no-scrolling [style*="${value}"]`);
    };

    async fillTextElement(container: string, element: string, textData: string): Promise<void> {
        const textSection = await this.elementInSection(container, element);
        await textSection!.click({clickCount: 3});
        await setValue(await textSection, textData);
        await textSection!.click({clickCount: 3});
    };

    async addColor(color: string): Promise<void> {
        await this.chooseColor.click();
        const colorInput = this.input('transparent');
        await setValue(await colorInput, color);
        await colorInput?.press('Enter');
    };

    async addTextWidth(value: string): Promise<void> {
        const textWidth = this.input('0');
        await setValue(await textWidth, value);
    };

    async addTextHeight(value: string): Promise<void> {
        const textHeight = this.input('1');
        await setValue(await textHeight, value);
    };

    async allCapsBtn(): Promise<void> {
        const textTransform = this.iconName('all_caps');
        await textTransform.click();
    };

    async capitalizeBtn(): Promise<void> {
        const textTransform = this.iconName('capitalize');
        await textTransform.click();
    };

    async lovercaseBtn(): Promise<void> {
        const textTransform = this.iconName('lovercase');
        await textTransform.click();
    };

    async textAlignmentForLeft(): Promise<void> {
        const textAlignment = this.iconName('1_left');
        await textAlignment.click();
    };

    async textAlignmentForCenter(): Promise<void> {
        const alignmentForCenter = this.iconName('center');
        await alignmentForCenter.click();
    };

    async textAlignmentForRight(): Promise<void> {
        const alignmentForRight = this.iconName('3_right');
        await alignmentForRight.click();
    };

    async textAlignmentForJustify(): Promise<void> {
        const alignmentForJustify = this.iconName('justify');
        await alignmentForJustify.click();
    };

    async textUnderlined(): Promise<void> {
        const textUnderlined = this.iconName('underlined');
        await textUnderlined.click();
    };

    async textStrikethrough(): Promise<void> {
        const textStrikethrough = this.iconName('strikethrough');
        await textStrikethrough.click();
    };

    async checkTextInElement(container: string, element: string, text: string): Promise<void> {
        await expect(this.elementInSection(container, element)).toHaveText(text);
    };

    async checkValueFont(font: string): Promise<void> {
        await this.checkStyle(`font-family: ${font}`).waitFor();
    };

    async checkValueSize(size: string): Promise<void> {
        await this.checkStyle(`font-size: ${size}px`).waitFor();
    };

    async checkValueHeight(height: string): Promise<void> {
        await this.checkStyle(`line-height: ${height}`).waitFor();
    };

    async checkValueColor(color: string): Promise<void> {
        await this.checkStyle(`color: rgb(${color});`).waitFor();
    };

    async checkBackground(background: string): Promise<void> {
        await this.checkStyle(`background-color: rgb(${background});`).waitFor();
    };
}