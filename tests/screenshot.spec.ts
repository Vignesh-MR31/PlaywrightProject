import {test,expect,chromium} from '@playwright/test';

test.describe('Screenshots demo', async() => {
    test('Screenshot method', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
        const timestamp = Date.now();
        await page.screenshot({path:'tests/screenshots/screenshot'+timestamp+'.png'});
    });
    test('Full page screenshot', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
        const timestamp = Date.now();
        await page.screenshot({path:'tests/screenshots/fullpage'+timestamp+'.png', fullPage:true});
    });
    test('Locator screenshot', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
        const timestamp = Date.now();
        const locator = await page.locator('button[name="start"]');
        await locator.screenshot({path:'tests/screenshots/locator'+timestamp+'.png'});
    });
    test('Failure screenshot', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
        const locator = await page.locator('button[name="start"]');
        await expect(locator).not.toBeVisible();
    });
});