// import { Page, Locator } from '@playwright/test';
// import path from 'path';

// export const uploadFile = async (page: Page, selector: string, filePath: string) => {
//   const resolvedPath = path.resolve(filePath);
//   await page.setInputFiles(selector, resolvedPath);
// };

// export class AddItemPage {
//     readonly page: Page;
//     readonly itemImage: Locator;
//     readonly itemTitle: Locator;
//     readonly itemDescription: Locator;
//     readonly itemPrice: Locator;
//     readonly itemCreateButton: Locator;

//     constructor (page: Page) {
//         this.page = page;
//         this.itemImage = page.locator('[for="file"]');
//         this.itemTitle = page.locator('[name="title"]');
//         this.itemDescription = page.locator('xpath=(//input[@name="description"])');
//         this.itemPrice = page.locator('[name="price"]');
//         this.itemCreateButton = page.locator('[type="submit"]');
//     }
// }

import { Page } from '@playwright/test';

export class AddItemPage {
  constructor(private page: Page) {}

  get itemTitle() {
    return this.page.locator('[name="title"]');
  }

  get itemDescription() {
    return this.page.locator('xpath=(//input[@name="description"])');
  }

  get itemPrice() {
    return this.page.locator('[name="price"]');
  }

  get itemCreateButton() {
    return this.page.locator('[type="submit"]');
  }
}
