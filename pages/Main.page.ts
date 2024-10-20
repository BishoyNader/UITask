import { Page } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}

  async visit() {
    await this.page.goto('https://e-commerce-kib.netlify.app/');
  }

  get addButton() {
    return this.page.locator('xpath=(//a[@href="/add"])');
  }

  get searchField() {
    return this.page.locator('xpath=(//input[@placeholder="Search for products ..."])');
  }

  get searchedItemTitle() {
    return this.page.locator('[class="sc-kpDqfm hfQJgD mt-4 cursor-pointer"]');
  }

  get firstItemEditButton() {
    return this.page.locator('xpath=(//button[@class="sc-cwHptR kKPVKI flex justify-center items-center h-9 w-9 transition ease-in-out delay-150 duration-300"])[1]');
  }

  get firstItemDeleteButton() {
    return this.page.locator('xpath=(//button[@class="sc-cwHptR sc-jEACwC kKPVKI jdGkNS flex justify-center items-center h-9 w-9 transition ease-in-out delay-150 duration-300"])[1]');
  }

  async getFirstItemTitle() {
    return await this.page.locator('xpath=(//div[@class="sc-kpDqfm hfQJgD mt-4 cursor-pointer"])[1]').textContent();
  }
  get noProductFound() {
    return this.page.locator('[class="text-center text-sm"]');
  }
}
