import { test, expect, Page } from '@playwright/test';
import { chromium, Browser } from 'playwright';
import path from 'path';
import { MainPage } from '../pages/Main.page';
import { AddItemPage } from '../pages/AddItem';

let browser: Browser;
let page: Page;
const itemTitle = 'Added item title';
const itemDescription = 'Added item description which should be greater than 30 letters';
const itemValue = '50';

test.beforeEach(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  const mainPage = new MainPage(page);
  await mainPage.visit();
});

test.describe('Add new item test case', () => {
  test('add new item and make sure it is added normally', async () => {
    const mainPage = new MainPage(page);
    const addItemPage = new AddItemPage(page);

    await mainPage.addButton.click();
    await addItemPage.itemTitle.fill(itemTitle);
    await addItemPage.itemDescription.fill(itemDescription);
    await addItemPage.itemPrice.fill(itemValue);
    await addItemPage.itemCreateButton.click();

    await page.waitForLoadState();
    await mainPage.searchField.fill(itemTitle);
    await page.waitForTimeout(3000);

    await expect(mainPage.searchedItemTitle).toBeVisible();
  });

  test('should not add an item with an empty title', async () => {
    const mainPage = new MainPage(page);
    const addItemPage = new AddItemPage(page);

    await mainPage.addButton.click();
    await addItemPage.itemTitle.fill(itemTitle);
    await addItemPage.itemTitle.clear();
    await addItemPage.itemDescription.click();

    const errorMessage = await addItemPage.itemErrorMessage.textContent();
    await expect(errorMessage).toBe('This field is required');
  });

  test('should not add an item with a short description', async () => {
    const mainPage = new MainPage(page);
    const addItemPage = new AddItemPage(page);

    await mainPage.addButton.click();
    await addItemPage.itemTitle.fill(itemTitle);
    await addItemPage.itemDescription.fill('Short desc');
    await addItemPage.itemPrice.fill(itemValue);
    await addItemPage.itemTitle.click();

    const errorMessage = await addItemPage.itemErrorMessage.textContent();
    await expect(errorMessage).toBe('Min length is 30 !');
  });

  test('should not add an item with a price less than 30', async () => {
    const mainPage = new MainPage(page);
    const addItemPage = new AddItemPage(page);

    await mainPage.addButton.click();
    await addItemPage.itemTitle.fill(itemTitle);
    await addItemPage.itemDescription.fill(itemDescription);
    await addItemPage.itemPrice.fill('20');
    await addItemPage.itemDescription.click();

    const errorMessage = await addItemPage.itemErrorMessage.textContent();
    await expect(errorMessage).toBe('Min price is 30 !');
  });

  test('Edit a product', async () => {
    const mainPage = new MainPage(page);
    const addItemPage = new AddItemPage(page);

    await mainPage.firstItemEditButton.click();
    await addItemPage.itemTitle.fill(itemTitle);
    await addItemPage.itemDescription.fill(itemDescription);
    await addItemPage.itemPrice.fill(itemValue);
    await addItemPage.itemCreateButton.click();

    await page.waitForLoadState();
    await mainPage.searchField.fill(itemTitle);
    await page.waitForTimeout(3000);

    await expect(mainPage.searchedItemTitle).toBeVisible();
  });

  test('Delete a product', async () => {
    const mainPage = new MainPage(page);
    const addItemPage = new AddItemPage(page);
    const deletedItemTitle = 'Test To Delete';

    await mainPage.addButton.click();
    await addItemPage.itemTitle.fill(deletedItemTitle);
    await addItemPage.itemDescription.fill(itemDescription);
    await addItemPage.itemPrice.fill(itemValue);
    await addItemPage.itemCreateButton.click();

    await page.waitForLoadState();
    await mainPage.searchField.fill(deletedItemTitle);
    await page.waitForTimeout(3000);

    await mainPage.firstItemDeleteButton.click();
    await page.reload();
    await mainPage.searchField.fill(deletedItemTitle);
    await page.waitForTimeout(3000);

    await expect(mainPage.noProductFound).toBeVisible();
  });
});

test.afterEach(async () => {
  await page.close();
  await browser.close();
});
