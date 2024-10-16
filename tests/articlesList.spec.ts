import { test, expect } from '@playwright/test';
import { ArticlesListPage } from '../pages/ArticlesListPage';
import { BasePage } from "../pages/Base.page";
import { MainPage } from "../pages/Main.page";
let basePage;
let mainPage;
let articlesListPage;

test.describe('Test news page for all elements', () => {
    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        articlesListPage = new ArticlesListPage(page);
        await mainPage.visitJordan();
        await mainPage.navigateToArticlesPage();
    })

    test('check url and existance of all locators', async ({page}) => {
        await expect (page).toHaveURL('https://automation.altibb.com/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9');
        await expect (articlesListPage.pageHeader).toContainText('مقالات طبية');
        await expect (articlesListPage.firstSortSelector).toBeVisible();
        await expect (articlesListPage.specialitySelector).toBeVisible();
        await expect (articlesListPage.firstArticleBody).toBeVisible();
        await expect (articlesListPage.leftArrow).toBeVisible();
        await expect (articlesListPage.lastPage).toBeVisible();
        await expect (articlesListPage.talkToADoctorButton).toBeVisible();
    })
    test('verify talk to a doctor', async({page}) => {
        await articlesListPage.clickTalkToADoctorButton();
        await expect (articlesListPage.talkToADoctorHeader).toContainText(`كيف تريد أن تتواصل مع الطبيب؟`);
    })
    test('check pagenation', async({page}) => {
        articlesListPage = new ArticlesListPage(page);
        await expect (articlesListPage.lastPage).toBeVisible();
        await articlesListPage.clickLastPage();
        await expect (articlesListPage.rightArrow).toBeVisible();
        await expect (articlesListPage.firstPage).toBeVisible();
        await articlesListPage.clickFirstPage();
        await expect (articlesListPage.leftArrow).toBeVisible();
        await articlesListPage.leftArrow.click();
        await expect (articlesListPage.rightArrow).toBeVisible();
        await articlesListPage.rightArrow.click();
        await expect (page).toHaveURL('https://automation.altibb.com/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA-%D8%B7%D8%A8%D9%8A%D8%A9');
    })
    test('check when filter by most visit', async({page}) => {
        articlesListPage = new ArticlesListPage(page);
        await expect (articlesListPage.firstSortSelector).toBeVisible();
        await articlesListPage.selectByMostVisitSelector();
        await expect (articlesListPage.firstSortSelector).toContainText('الأكثر زيارة');
    })
    test('check when filter by speciality', async({page}) => {
        articlesListPage = new ArticlesListPage(page);
        await expect (articlesListPage.specialitySelector).toBeVisible();
        await articlesListPage.clickSpecialitySelector();
        await expect (articlesListPage.specialitySearch).toBeVisible();
        await articlesListPage.specialitySearch.click();
        await articlesListPage.specialitySearch.fill ('أمراض الدم');
        await expect (articlesListPage.selectedSpeciality).toBeVisible();
        await articlesListPage.selectedSpeciality.click();
        await expect (articlesListPage.specialitySelector).toContainText("×أمراض الدم");
    })
})