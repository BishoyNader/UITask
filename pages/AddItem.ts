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
