import { test, expect } from '@playwright/test';
import { chromium, Page } from 'playwright';
import path from 'path';
import { AddItemPage } from '../pages/AddItem';
import { MainPage } from '../pages/Main.page';
let page: Page;
let itemTitle= 'Added item title';
let itemDescription= 'Added item description which should be greater than 30 letters';
let itemValue= '50';

test.beforeEach(async () => {
  const browser = await chromium.launch();
  page = await browser.newPage();
  let mainPage = new MainPage(page);
  await mainPage.visit();
});
test.describe('Add new item test case', () => {
    test('add new item and make sure it is added normally', async () => {
        let mainPage = new MainPage(page);
        let addedItemPage = new AddItemPage(page);
        await mainPage.addButton.click();
        await addedItemPage.itemTitle.fill(itemTitle);
        await addedItemPage.itemDescription.fill(itemDescription);
        await addedItemPage.itemPrice.fill(itemValue);
        await addedItemPage.itemCreateButton.click();
        await page.waitForLoadState();
        await mainPage.searchField.fill(itemTitle);
        await page.waitForTimeout(3000);
        await expect(mainPage.searchedItemTitle).toBeVisible();
      });

      test('Edit a product', async () => {
        let mainPage = new MainPage(page);
        let addedItemPage = new AddItemPage(page);
        await mainPage.firstItemEditButton.click();
        await addedItemPage.itemTitle.fill(itemTitle);
        await addedItemPage.itemDescription.fill(itemDescription);
        await addedItemPage.itemPrice.fill(itemValue);
        await addedItemPage.itemCreateButton.click();
        await page.waitForLoadState();
        await mainPage.searchField.fill(itemTitle);
        await page.waitForTimeout(3000);
        await expect(mainPage.searchedItemTitle).toBeVisible();
      });

      test('Delete a product', async () => {
        let mainPage = new MainPage(page);
        let deletedItemTitle = await mainPage.getFirstItemTitle();
        await mainPage.firstItemDeleteButton.click();
        await page.waitForTimeout(1000);
        await mainPage.searchField.fill(deletedItemTitle);
        await page.waitForTimeout(3000);
        await expect(mainPage.noProductFound).toBeVisible();
      });
})


test.afterEach(async ({ browser }) => {
  (async () => {
      await page.close();
    });
});
