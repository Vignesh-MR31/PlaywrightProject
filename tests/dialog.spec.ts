import {test,expect,Locator,Page} from "@playwright/test";

test.describe("Dialog actions",async() =>{
    test("Setting dialog handler",async({page}) =>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        //Register a dialog handler
        page.on("dialog",(dialog) =>{
            console.log(`Dialog type:`, dialog.type());
            console.log(`Dialog Message:`,dialog.message());
            dialog.accept();
        })
        await page.locator('#alertBtn').click();

        page.on("dialog",(dialog) =>{
            console.log(`Dialog type:`, dialog.type());
            console.log(`Dialog Message:`,dialog.message());
            dialog.dismiss();
        })
        await page.locator(`confirmBtn`).click();
    })
    test("Setting dialog handler confirm dialog",async({page}) =>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        page.on("dialog",(dialog) =>{
            console.log(`Dialog type:`, dialog.type());
            console.log(`Dialog Message:`,dialog.message());
            dialog.dismiss();
        })
        await page.locator(`#confirmBtn`).click();
    })
    test("Setting dialog handler prompt dialog",async({page}) =>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        page.on("dialog",(dialog) =>{
            console.log(`Dialog type:`, dialog.type());
            console.log(`Dialog Message:`,dialog.message());
            console.log(dialog.defaultValue())
            dialog.accept("Test");
        })
        await page.locator(`#promptBtn`).click();
        await page.waitForTimeout(3000);
    })
})