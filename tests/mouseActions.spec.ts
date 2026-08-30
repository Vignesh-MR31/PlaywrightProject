import {test,expect} from '@playwright/test';

test.describe("Mouse actions", async () => {
    test("Mouse hover", async ({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        await page.locator(".dropbtn").hover();
        const dropdown = page.locator(".dropdown-content");
        await expect(dropdown).toBeVisible();
        const actualValues = await dropdown.locator("a[href='#']").allInnerTexts();
        console.log({actualValues});
        const expectedValues = ["Mobiles","Laptops"];
        await expect(actualValues).toEqual(expectedValues);
    })
    test("Mouse right click", async({page}) => {
        await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
        const rightClickBtn = await page.locator('span',{hasText:'right click me'});
        rightClickBtn.click({button:'right'});
        await expect(page.locator(".context-menu-list")).toBeVisible();
        //Registering the dialog
        page.on("dialog",(dialog) =>{
            console.log(`Dialog type:`, dialog.type());
            console.log(`Dialog Message:`,dialog.message());
            dialog.accept();
        })
        await expect(page.locator(".context-menu-item").locator('span',{hasText:"Edit"})).toBeVisible();
        await page.locator(".context-menu-item").locator('span',{hasText:"Edit"}).click();
    })
    test("Mouse doubleclick", async ({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        const expectedValue = await page.locator("input[id=field1]").inputValue();
        await page.locator('button',{hasText:'Copy Text'}).dblclick();
        await expect(page.locator("input[id=field2]")).toHaveValue(expectedValue);
    })
    test("Mouse drag and drop", async ({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        const source = await page.locator("#draggable");
        const destination = await page.locator("#droppable");
        await source.dragTo(destination);
        await page.waitForTimeout(3000);
    })
    test("Scroll Action without adding scroll code", async ({page}) => {
        await page.goto("https://testautomationpractice.blogspot.com/");
        await page.locator("a",{hasText:'Blogger'}).click();
    })
    test("Scroll Action ", async ({page}) => {
        await page.goto("https://www.booksbykilo.in/books?pricerange=201to500");
        let status = true
        while(status){
            page.evaluate( ()=> {
                window.scrollTo(0,document.body.scrollHeight);
            });
            const book = await page.locator('h3',{hasText:'Mother Goose Rhymes'}).isVisible();
            if(book){
                status = false;
                expect(book).toBeTruthy();
                await page.locator('h3',{hasText:'Mother Goose Rhymes'}).click();
                await page.waitForTimeout(1000);
            }
        }
    })
})