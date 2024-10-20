import { Page, Locator } from '@playwright/test';
const { allure } = require( "allure-playwright");
const defaultTimeout = 15000; // 10sec
export class BasePage {
    readonly page: any;
    constructor(page: Page) {
        this.page = page;
    }

    async setValue(selector: any, value: any) {
        await this.page.fill(selector, value);
    }
    async openUrl(url: any) {
        await this.page.goto(url);
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState("load");
    }
    async getUrl(){
        return await this.page.url();
    }
    async waitTimeout(milliseconds: number) {
        await this.page.waitForTimeout(milliseconds);
    }
    async pageReload() {
        await this.page.reload();
    }
    async getElement(selector: any) {
        return this.page.locator(selector);
    }
    async isElementClickable(selector: any) {
        return (await this.getElement(selector)).isEnabled();
    }
    async isElementEnabled(selector: any) {
        return (await this.getElement(selector)).isEnabled();
    }
    async isElementDisplayed(selector: any) {
        return (await this.getElement(selector)).toBeVisible();
    }
    async click(selector: any) {
        await (await this.getElement(selector)).click({noWaitAfter: true});
        await this.waitTimeout(1000);
        await this.page.waitForLoadState("load", {timeout: 1000});
    }
    async waitUntilDisplayed(selector: any, timeout = defaultTimeout) {
        await this.page.waitForSelector(selector, {timeout: timeout});
    }
    async getElementText(element: any) {
        await this.waitUntilDisplayed(element);
        return (await this.getElement(element)).innerText();
    }
    async getElementCssProperty(selector: any, attribute: string) {
        return await (await this.getElement(selector)).evaluate((element: Element) =>
            window.getComputedStyle(element).getPropertyValue(attribute),
        );
    }
    async getElementAttribute(selector: any, attribute: any) {
        return (await this.getElement(selector)).getAttribute(attribute);
    }

    async addFeatureStoryAllure(navigateUrl: any, epic: any, features: any, story: any) {
        await allure.epic(epic);
        await allure.feature(features);
        await allure.story(story);
        await allure.id(navigateUrl);
    }
}