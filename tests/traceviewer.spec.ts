import {test,expect,chromium} from '@playwright/test';

test.describe('Trace viewer demo', async() => {
    test('Trace viewer in config file', async({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        await page.locator("input[id='name']").fill("Tester");
        await page.locator("input[id='email']").fill("Tester@gmail.com");
        await page.locator("input[id='phone']").fill("1234567890");
        await expect(page.locator('#textarea')).not.toBeVisible();
    });
    test('Trace viewer using context', async({page, context}) => {
        //Starting the trace
        await context.tracing.start({screenshots:true, snapshots:true});
        //Script execution
        await page.goto("https://testautomationpractice.blogspot.com/");
        await page.locator("input[id='name']").fill("Tester");
        await page.locator("input[id='email']").fill("Tester@gmail.com");
        await page.locator("input[id='phone']").fill("1234567890");
        await expect(page.locator('#textarea')).toBeVisible();
        //Stopping the trace
        await context.tracing.stop({path:'trace.zip'});
    });

});