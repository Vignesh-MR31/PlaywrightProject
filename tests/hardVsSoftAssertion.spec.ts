import {test,expect,chromium} from '@playwright/test';

test.describe('Hard and soft assertions', async() => {
    test('Hard Assertion', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        await expect(page).toHaveTitle('Automation Testing Practices'); //Will fail stop the execution
        await expect(page.locator('#alertBtn')).toBeVisible();
    });
    test('Soft Assertion', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        await expect.soft(page).toHaveTitle('Automation Testing Practices'); //Will fail won't stop the execution
        await expect.soft(page.locator('#alertBtn')).toBeVisible();
    });
});