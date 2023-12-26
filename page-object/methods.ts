import { Locator } from "@playwright/test";

export async function setValue(element: Locator, value: string): Promise<void> {
    await element!.click({clickCount: 3});
    await element!.press('Backspace');
    await element!.click();
    await element!.type(value);
}