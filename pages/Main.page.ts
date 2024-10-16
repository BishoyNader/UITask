import { Page, Locator } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly callDocButton: Locator;
    readonly callADoctorButton: Locator;
    readonly discoverMedicalLink: Locator;
    readonly articlesLink: Locator;

    constructor (page: Page) {
        this.page = page;
        // this.callDocButton = page.locator('#id-1-13');// not working for JO
        this.callADoctorButton = page.locator('#id-1-13');
        this.callDocButton = page.locator(`[class="call-a-doctor-banner id-1-1 js-egypt js-other-countries"]`);
        this.discoverMedicalLink = page.locator('[href="#"][data-even-name="Menu Opened"]');
        this.articlesLink = page.locator('text=المقالات الطبية >> nth=1');
    }

    async visit() {
        await this.page.goto('https://automation.altibb.com/');
    }

    async visitJordan() {
        await this.page.goto('https://automation.altibb.com/helper/set-country?country_code=JO');
    }

    async visitEgypt() {
        await this.page.goto('https://automation.altibb.com/helper/set-country?country_code=EG');
    }

    async visitSA() {
        await this.page.goto('https://automation.altibb.com/helper/set-country?country_code=SA');
    }
    async navigateToArticlesPage(){
        await this.discoverMedicalLink.click();
        await this.articlesLink.click();
    }
}