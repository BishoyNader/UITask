import { chromium, Browser, Page } from 'playwright';
import { clickButtonAndVerifyCounter } from '../pages/Counter';

let browser: Browser;
let page: Page;


test('should interact with an element inside canvas', async () => {
    browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://flutter-angular.web.app/'); // Replace with the URL of the third-party app
  // Locate the canvas element
  const canvas = page.locator('[style="width: 100%; height: 100%; display: block; overflow: hidden; position: relative; cursor: default;"]'); // Replace with the actual selector for your canvas

  // Get the bounding box of the canvas element
  const boundingBox = await canvas.boundingBox();
  if (!boundingBox) {
    throw new Error('Canvas element not found');
  }

  // Specify the coordinates relative to the canvas bounding box
  const buttonX = boundingBox.x + 260; // Adjust relative X coordinate
  const buttonY = boundingBox.y + 450; // Adjust relative Y coordinate
  const counterX = boundingBox.x + 160; // Adjust relative X coordinate
  const counterY = boundingBox.y + 430; // Adjust relative Y coordinate

  const counterIncreased = await clickButtonAndVerifyCounter(page, buttonX, buttonY, counterX, counterY);
  expect(counterIncreased).toBe(true);
  await browser.close();
});

import { test, expect } from '@playwright/test';

test.describe('Flutter Counter App', () => {
  test('should increase counter on button click', async ({ page }) => {
    // Navigate to the URL
    await page.goto('https://flutter-angular.web.app/');

    // Get the initial value of the counter
    const counterLocator = page.locator('text=Counter');
    const initialValue = await counterLocator.textContent();
    console.log(`Initial Counter Value: ${initialValue}`);
    // Ensure the initial value is not null
    if (initialValue === null) throw new Error('Initial counter value is null');

    // Locate the button by CSS selector
    const plusButton = page.locator('button');
    await plusButton.first().click(); // Assuming it’s the first button

    // Verify the counter has increased by 1
    const updatedCounterLocator = page.locator('text=Counter');
    const updatedValue = await updatedCounterLocator.textContent();
    console.log(`Updated Counter Value: ${updatedValue}`);

    // Ensure the updated value is not null
    if (updatedValue === null) throw new Error('Updated counter value is null');
    expect(Number(updatedValue.replace('Counter: ', ''))).toBe(Number(initialValue.replace('Counter: ', '')) + 1);
  });
});