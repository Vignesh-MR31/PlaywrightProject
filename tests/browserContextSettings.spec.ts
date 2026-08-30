import {test,expect,chromium} from '@playwright/test';

test.describe('Browser settings', async() => {
    test('Browser headless/headed mode', async() => {
        //Browser ---> context ---> page
        //Creating the browser
        const browser = await chromium.launch({headless:false}); //runs in headed mode we able saw UI
        //Creating the context
        const context = await browser.newContext();
        //Creating the page
        const page = await context.newPage();

        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    })
    test('Browser Size', async() => {
        const browser = await chromium.launch({headless:false}); //runs in headed mode we able saw UI
        //Adding the options in context
        const context = await browser.newContext({
            viewport:{width:1000,height:1000}
        });
        const page = await context.newPage();

        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    })
    test('Browser Language', async() => {
        const browser = await chromium.launch({headless:false}); //runs in headed mode we able saw UI
        //Adding the options in context
        const context = await browser.newContext({
            locale:'en-US',
        });
        const page = await context.newPage();

        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    })
    test('Browser Proxy example', async() => {
        const browser = await chromium.launch({headless:false}); //runs in headed mode we able saw UI
        //Adding the options in context
        const context = await browser.newContext({
            locale:'en-US',
            proxy:{server:'https:/proxy-server:1000'}
        });
        const page = await context.newPage();

        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    })
    test('Browser SSL example', async() => {
        const browser = await chromium.launch({headless:false}); //runs in headed mode we able saw UI
        //Adding the options in context
        const context = await browser.newContext({
            locale:'en-US',
            ignoreHTTPSErrors:true
        });
        const page = await context.newPage();

        await page.goto("https://expired.badssl.com/");
        console.log(await page.title());
    })
    //Cookie creation
    test('Browser cookie addtion', async() => {
        const browser = await chromium.launch({headless:false}); //runs in headed mode we able saw UI
        //Adding the options in context
        const context = await browser.newContext();
        const page = await context.newPage();
        //Adding the cookies
        context.addCookies([{name:'Testing',value:'Test', url:'https://testautomationpractice.blogspot.com/p/download-files_25.html'}]);

        await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
        //Get all the cookies
        const allCookies = await context.cookies();
        //Get added cookie using find method
        const myCookie = allCookies.find((index) => index.name === 'Testing');

        expect(myCookie.value).toBe('Test');
        console.log({myCookie});
        console.log({allCookies})

        //Clear all the cookies
        await context.clearCookies();

        const allCookiesAfterClear = await context.cookies();
        expect(allCookiesAfterClear.length).toBe(0);
    })
})