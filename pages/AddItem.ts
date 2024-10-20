import { Page, Locator } from '@playwright/test';
import path from 'path';

export const uploadFile = async (page: Page, selector: string, filePath: string) => {
  const resolvedPath = path.resolve(filePath);
  await page.setInputFiles(selector, resolvedPath);
};

export class AddItemPage {
    readonly page: Page;
    readonly itemImage: Locator;
    readonly itemTitle: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly itemCreateButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.itemImage = page.locator('[for="file"]');
        this.itemTitle = page.locator('[name="title"]');
        this.itemDescription = page.locator('xpath=(//input[@name="description"])');
        this.itemPrice = page.locator('[name="price"]');
        this.itemCreateButton = page.locator('[type="submit"]');
    }
}