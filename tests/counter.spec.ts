import { chromium, Browser, Page } from 'playwright';
import { expect, test } from '@playwright/test';
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
