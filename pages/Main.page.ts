// import { Page, Locator } from '@playwright/test';

// export class MainPage {
//     readonly page: Page;
//     readonly addButton: Locator;
//     readonly searchField: Locator;
//     readonly searchedItemTitle: Locator;
//     readonly firstItemTitle: Locator;
//     readonly firstItemEditButton: Locator;
//     readonly firstItemDeleteButton: Locator;
//     readonly noProductFound: Locator;

//     constructor (page: Page) {
//         this.page = page;
//         this.addButton = page.locator('xpath=(//a[@href="/add"])');
//         this.searchField = page.locator('xpath=(//input[@placeholder="Search for products ..."])');
//         this.searchedItemTitle = page.locator('[class="sc-kpDqfm hfQJgD mt-4 cursor-pointer"]');
//         this.firstItemTitle = page.locator('xpath=(//div[@class="sc-kpDqfm hfQJgD mt-4 cursor-pointer"])[1]');
//         this.firstItemEditButton = page.locator('xpath=(//button[@class="sc-cwHptR kKPVKI flex justify-center items-center h-9 w-9 transition ease-in-out delay-150 duration-300"])[1]');
//         this.firstItemDeleteButton = page.locator('xpath=(//button[@class="sc-cwHptR sc-jEACwC kKPVKI jdGkNS flex justify-center items-center h-9 w-9 transition ease-in-out delay-150 duration-300"])[1]');
//         this.noProductFound = page.locator('[class="text-center text-sm"]');
//     }

//     async visit() {
//         await this.page.goto('https://e-commerce-kib.netlify.app/');
//     }
//     async searchedItemTitleText() {
//         return this.searchedItemTitle.textContent();
//     }
//     async getFirstItemTitle() {
//         return this.firstItemTitle.innerText();
//     }
// }
// export const searchAndVerifyItem = async (page: Page, searchItem: string, listItemSelector: string) => {
//     // Perform the search
//     await page.fill('xpath=(//input[@placeholder="Search for products ..."])', searchItem);
    
//     // Wait for search results to load
//     await page.waitForSelector(listItemSelector);
  
//     // Get all list items
//     const items = await page.locator(listItemSelector);
//     const itemCount = await items.count();
  
//     // Verify that the searched item name is included in the list
//     let found = false;
//     for (let i = 0; i < itemCount; i++) {
//       const itemText = await items.nth(i).textContent();
//       if (itemText && itemText.includes(searchItem)) {
//         found = true;
//         break;
//       }
//     }
  
//     return found;
//   };

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
