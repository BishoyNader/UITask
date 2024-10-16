import { Page, Locator } from '@playwright/test';

export class ArticlesListPage {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly discoverMedicalLink: Locator;
    readonly newsLink: Locator;
    readonly firstSortSelector: Locator;
    readonly specialitySelector: Locator;
    readonly firstArticleBody: Locator;
    readonly leftArrow: Locator;
    readonly lastPage: Locator;
    readonly rightArrow: Locator;
    readonly talkToADoctorButton: Locator;
    readonly talkToADoctorTitle: Locator;
    readonly talkToADoctorHeader: Locator;
    readonly firstPage: Locator;
    readonly selectByMostVisit: Locator;
    readonly specialitySearch: Locator;
    readonly selectedSpeciality: Locator;

    selectedArticleNumber = null;

    constructor (page: Page) {
        this.page = page;
        this.pageHeader = page.locator('[class="index-page-title"]');
        this.discoverMedicalLink = page.locator('xpath=//a[contains(text(),"اكتشف الطبي")][1]');
        this.newsLink = page.locator('[href="#"][data-even-name="Menu Opened"] ~ ul>li:nth-child(4)>ul>li:nth-child(3)>a');
        this.firstSortSelector = page.locator('xpath=(//span[@role="combobox"])[1]');
        // this.specialitySelector = page.locator('xpath=(//span[@role="combobox"])[2]');
        this.specialitySelector = page.locator('#select2-w0-container');
        this.firstArticleBody = page.locator('xpath=(//div[@class="article-body w-100"])[1]');
        this.leftArrow = page.locator('xpath=(//img[@alt="arrow left"])[1]');
        this.lastPage = page.locator('xpath=(//span[@class="three_dots_truncate"])[1]');
        this.talkToADoctorButton = page.locator('article>div>a[data-event-name="Consultation Lead"]:nth-child(1)');
        this.talkToADoctorTitle = page.locator('[class="ask-question-title"]');
        this.rightArrow = page.locator("xpath=(//img[@alt='arrow right'])[1]");
        this.firstPage = page.locator("xpath=(//span[@class='badge badge-secondary'])[1]");
        this.selectByMostVisit = page.locator("xpath=(//html[1]/body[1]/span[1]/span[1]/span[2]/ul[1]/li[2])");
        // this.specialitySearch = page.locator("xpath=(//input[@role='textbox'])[1]");
        this.specialitySearch = page.locator(".select2-search__field");
        // this.selectedSpeciality = page.locator("xpath=(//html[1]/body[1]/span[1]/span[1]/span[2]/ul[1]/li[2])");
        this.selectedSpeciality = page.locator(`[role="option"]`);
        this.talkToADoctorHeader = page.locator(`.chat-or-call-header`)
    }

    async clickFirstSortSelector(){
        await this.firstSortSelector.click();
    }
    async clickTalkToADoctorButton(){
        await this.talkToADoctorButton.click();
    }
    async clickLastPage(){
        await this.lastPage.click();
    }
    async clickFirstPage(){
        await this.firstPage.click();
    }
    async clickMostVisitSelector() {
        await this.selectByMostVisit.click();
    }
    async selectByMostVisitSelector() {
        await this.clickFirstSortSelector();
        await this.clickMostVisitSelector();
    }
    async clickSpecialitySelector() {
        await this.specialitySelector.click();
    }
    async getSpecialitySelectorText() {
        return this.specialitySelector.innerText();
    }
    
}