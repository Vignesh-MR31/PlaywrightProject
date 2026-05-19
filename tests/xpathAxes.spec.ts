import {test,expect} from "@playwright/test";

test.describe("XPath axes",()=>{
    //child to parent
    test.beforeEach("Verify the navigation to the URL using XPath locator", async ({page}) => {
        await test.step("Go to page and check the URL", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//div[@class='login_logo']/parent::div")).toBeVisible();
            await expect(page.locator("//div[@class='login_logo']")).toHaveText("Swag Labs");
            await expect(page).toHaveURL("https://www.saucedemo.com/");
        });
    });
    //parent to child
    test("Verify the login functionality using XPath axes", async ({page}) => {
        await test.step("Go to page, login and check the URL", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//div[@class='form_group'][1]/child::input")).toBeVisible();
            await page.locator("//div[@class='form_group'][1]/child::input").fill("standard_user");
            await expect(page.locator("//div[@class='form_group'][2]/child::input")).toBeVisible();
            await page.locator("//div[@class='form_group'][2]/child::input").fill("secret_sauce");
            await page.locator("//input[@id='login-button'][@name='login-button']").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });
    });
    //ancestor
    test("Verify the selection of product using XPath locator", async ({page}) => {
        await test.step("Go to page, login, sort products and check the sorting", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//input[@id='user-name']/ancestor::div[1]")).toBeVisible();
            await page.locator("//input[@id='user-name']").fill("standard_user");
            await expect(page.locator("//input[@id='password']/ancestor::div[1]")).toBeVisible();
            await page.locator("//input[@id='password']").fill("secret_sauce");
            await page.locator("//input[@id='login-button' and @name='login-button']").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("//img[@alt='Sauce Labs Backpack']/ancestor::div[1]")).toBeVisible();
            await page.locator("//img[@alt='Sauce Labs Backpack']/ancestor::div[1]").click();
            await expect(page.locator("//button[@id='back-to-products']/ancestor::div[1]")).toBeVisible();
            await page.locator("//button[@id='back-to-products']/ancestor::div[1]").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });
    });
    //descendant
    test("Verify the addition of product to cart using XPath locator", async ({page}) => {
        await test.step("Go to page, login, add product to cart and check the cart", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//div[@class='login-box']/descendant::input[1]")).toBeVisible();
            await page.locator("//div[@class='login-box']/descendant::input[1]").fill("standard_user");
            await expect(page.locator("//div[@class='login-box']/descendant::input[2]")).toBeVisible();
            await page.locator("//div[@class='login-box']/descendant::input[2]").fill("secret_sauce");
            await page.locator("//div[@class='login-box']/descendant::input[3]").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("//div[@id='inventory_container']/descendant::img[2]")).toBeVisible();
            await page.locator("//div[@id='inventory_container']/descendant::img[2]").click();
            await expect(page.locator("//div[contains(@class,'desc')]/descendant::button")).toBeVisible();
            await page.locator("//div[contains(@class,'desc')]/descendant::button").click();
            await expect(page.locator("//div[contains(@class,'desc')]/descendant::button")).toHaveText("Remove");
        });
    });
    //following
    test("Verify the addition of product to cart using XPath locator with contains function", async ({page}) => {
        await test.step("Go to page, login, add product to cart and check the cart", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//div[@class='login-box']/descendant::input[1]")).toBeVisible();
            await page.locator("//div[@class='login-box']/descendant::input[1]").fill("standard_user");
            await expect(page.locator("(//div[@class='form_group']/following::input)[1]")).toBeVisible();
            await page.locator("(//div[@class='form_group']/following::input)[1]").fill("secret_sauce");
            await page.locator("(//div[@class='form_group']/following::input)[2]").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("//img[contains(@alt,'Sauce Labs Bike Light')]")).toBeVisible();
            await page.locator("//img[contains(@alt,'Sauce Labs Bike Light')]").click();
            await expect(page.locator("//button[contains(@id,'add-to-cart')]")).toBeVisible();
            await page.locator("//button[contains(@id,'add-to-cart')]").click();
            await expect(page.locator("//button[contains(@id,'remove')]")).toBeVisible();
        });
    });
});