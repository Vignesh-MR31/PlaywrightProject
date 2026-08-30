import {test,expect} from '@playwright/test';

test.describe('Flaky test demo', async() => {
    test('Flaky test in config file', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        await page.locator("input[id='name']").fill("Tester");
        await page.locator("input[id='email']").fill("Tester@gmail.com");
        await page.locator("input[id='phone']").fill("1234567890");
        await page.waitForTimeout(5000);
        await expect(page.locator('#textarea')).toBeVisible();
    });
});