import {test,expect,chromium} from '@playwright/test';

test.describe('Autowaiting and timeouts', async() => {
    test('Without Autowait', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
        //When passing the parameter force actionability checks won't be performed that is without autowaiting
        await page.locator('#Wikipedia1_wikipedia-search-input').click({force:true});
        await page.locator('#Wikipedia1_wikipedia-search-input').fill('Test',{force:true});
    });
    test('Timeout', async({page}) => {
        test.setTimeout(5000);
        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
        //When passing the parameter force actionability checks won't be performed that is without autowaiting
        await page.locator('#Wikipedia1_wikipedia-search-input').click({force:true});
        await page.locator('#Wikipedia1_wikipedia-search-input').fill('Test',{force:true});
        await expect(page.locator("#alertBtn")).toHaveText('Simple Alert',{timeout:2000});
    });
});