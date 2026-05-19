import {test,expect} from "@playwright/test";

test.describe("Verify the XPath locators", async() => {
    //xpath with single attribute
    //tag[@attribute='value']
    test.beforeEach("Verify the navigation to the URL using XPath locator", async ({page}) => {
        await test.step("Go to page and check the URL", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//div[@class='login_logo']")).toBeVisible();
            await expect(page.locator("//div[@class='login_logo']")).toHaveText("Swag Labs");
            await expect(page).toHaveURL("https://www.saucedemo.com/");
        });
    });
    //xpath with multiple attributes
    //tag[@attribute1='value' and @attribute2='value']
    test("Verify the login functionality using XPath locator", async ({page}) => {
        await test.step("Go to page, login and check the URL", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//input[@id='user-name'][@name='user-name']")).toBeVisible();
            await page.locator("//input[@id='user-name'][@name='user-name']").fill("standard_user");
            await expect(page.locator("//input[@id='password'][@type='password']")).toBeVisible();
            await page.locator("//input[@id='password'][@type='password']").fill("secret_sauce");
            await page.locator("//input[@id='login-button'][@name='login-button']").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });
    });
    //xpath with and operator
    //tag[@attribute1='value' and @attribute2='value']
    test("Verify the selection of product using XPath locator", async ({page}) => {
        await test.step("Go to page, login, sort products and check the sorting", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//input[@id='user-name'and @name='user-name']")).toBeVisible();
            await page.locator("//input[@id='user-name'and @name='user-name']").fill("standard_user");
            await expect(page.locator("//input[@id='password' and @type='password']")).toBeVisible();
            await page.locator("//input[@id='password' and @type='password']").fill("secret_sauce");
            await page.locator("//input[@id='login-button' and @name='login-button']").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("//img[@alt='Sauce Labs Bike Light' and @class='inventory_item_img']")).toBeVisible();
            await page.locator("//img[@alt='Sauce Labs Bike Light' and @class='inventory_item_img']").click();
            await expect(page.locator("//button[@id='back-to-products' and @name='back-to-products']")).toBeVisible();
            await page.locator("//button[@id='back-to-products' and @name='back-to-products']").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });
    });
    //xpath with or operator
    //tag[@attribute1='value' or @attribute2='value']
    test("Verify the addition of product to cart using XPath locator", async ({page}) => {
        await test.step("Go to page, login, add product to cart and check the cart", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//input[@id='user-name' or @name='user-name']")).toBeVisible();
            await page.locator("//input[@id='user-name' or @name='user-name']").fill("standard_user");
            await expect(page.locator("//input[@id='password' or @type='password']")).toBeVisible();
            await page.locator("//input[@id='password' or @type='password']").fill("secret_sauce");
            await page.locator("//input[@id='login-button' or @name='login-button']").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("(//img[@alt='Sauce Labs Bike Light' or @class='inventory_item_img'])[2]")).toBeVisible();
            await page.locator("(//img[@alt='Sauce Labs Bike Light' or @class='inventory_item_img'])[2]").click();
            await expect(page.locator("//button[@id='add-to-cart' or @name='add-to-cart']")).toBeVisible();
            await page.locator("//button[@id='add-to-cart' or @name='add-to-cart']").click();
            await expect(page.locator("//button[@id='remove' or @name='remove']")).toBeVisible();
        });
    });
    //xpath with contains function
    //tag[contains(@attribute,'value')]
    test("Verify the addition of product to cart using XPath locator with contains function", async ({page}) => {
        await test.step("Go to page, login, add product to cart and check the cart", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//input[contains(@id,'user-name')]")).toBeVisible();
            await page.locator("//input[contains(@id,'user-name')]").fill("standard_user");
            await expect(page.locator("//input[contains(@id,'password')]")).toBeVisible();
            await page.locator("//input[contains(@id,'password')]").fill("secret_sauce");
            await page.locator("//input[contains(@id,'login-button')]").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("//img[contains(@alt,'Sauce Labs Bike Light')]")).toBeVisible();
            await page.locator("//img[contains(@alt,'Sauce Labs Bike Light')]").click();
            await expect(page.locator("//button[contains(@id,'add-to-cart')]")).toBeVisible();
            await page.locator("//button[contains(@id,'add-to-cart')]").click();
            await expect(page.locator("//button[contains(@id,'remove')]")).toBeVisible();
        });
    });
    //xpath with starts-with function
    //tag[starts-with(@attribute,'value')]
    test("Verify the addition of product to cart using XPath locator with starts-with function", async ({page}) => {
        await test.step("Go to page, login, add product to cart and check the cart", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//input[starts-with(@id,'user-name')]")).toBeVisible();
            await page.locator("//input[starts-with(@id,'user-name')]").fill("standard_user");
            await expect(page.locator("//input[starts-with(@id,'password')]")).toBeVisible();
            await page.locator("//input[starts-with(@id,'password')]").fill("secret_sauce");
            await page.locator("//input[starts-with(@id,'login-button')]").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("//img[starts-with(@alt,'Sauce Labs Bike Light')]")).toBeVisible();
            await page.locator("//img[starts-with(@alt,'Sauce Labs Bike Light')]").click();
            await expect(page.locator("//button[starts-with(@id,'add-to-cart')]")).toBeVisible();
            await page.locator("//button[starts-with(@id,'add-to-cart')]").click();
            await expect(page.locator("//button[starts-with(@id,'remove')]")).toBeVisible();
            await expect(page.locator("//div[starts-with(@id,'shopping_cart')]")).toBeVisible();
            await expect(page.locator("//div[starts-with(@id,'shopping_cart')]//span")).toHaveText("1");
        });
    });
    //xpath with text function
    //tag[text()='value']
    test("Verify the addition of product to cart using XPath locator with text function", async ({page}) => {
        await test.step("Go to page, login, add product to cart and check the cart", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//input[contains(@id,'user-name')]")).toBeVisible();
            await page.locator("//input[starts-with(@id,'user-name')]").fill("standard_user");
            await expect(page.locator("//input[starts-with(@id,'password')]")).toBeVisible();
            await page.locator("//input[starts-with(@id,'password')]").fill("secret_sauce");
            await page.locator("//input[starts-with(@id,'login-button')]").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            const products = page.locator("//div[contains(@class,'inventory_item_name')]");
            const productCount = await products.count();
            for(let product of await products.allTextContents()){
                await expect(page.locator(`//div[text()='${product}']`)).toBeVisible();
                await page.locator(`//div[text()='${product}']`).click();
                await expect(page.locator("//button[starts-with(@id,'add-to-cart')]")).toBeVisible();
                await page.locator("//button[starts-with(@id,'add-to-cart')]").click();
                await page.locator("//button[text()='Back to products']").click();
            }
            await expect(page.locator("//div[starts-with(@id,'shopping_cart')]")).toBeVisible();
            await expect(page.locator("//div[starts-with(@id,'shopping_cart')]//span")).toHaveText(productCount.toString());
        });
    });
    //xpath with last function
    //tag[last()]
    test("Verify the addition of product to cart using XPath locator with last function", async ({page}) => {
        await test.step("Go to page, login, add product to cart and check the cart", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("//input[contains(@id,'user-name')]")).toBeVisible();
            await page.locator("//input[starts-with(@id,'user-name')]").fill("standard_user");
            await expect(page.locator("//input[starts-with(@id,'password')]")).toBeVisible();
            await page.locator("//input[starts-with(@id,'password')]").fill("secret_sauce");
            await page.locator("//input[starts-with(@id,'login-button')]").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            const expectedProductName = await page.locator("//div[@class='inventory_item'][last()]//a[@id='item_3_title_link']").textContent();
            await page.locator("//div[@class='inventory_item'][last()]//img").click();
            const actualProductName = await page.locator("//div[contains(@class,'inventory_details_name')]").textContent();
            await expect(actualProductName).toBe(expectedProductName);
            await page.locator("//button[starts-with(@id,'add-to-cart')]").click();
            await page.locator("//button[text()='Back to products']").click();
            await expect(page.locator("//div[starts-with(@id,'shopping_cart')]")).toBeVisible();
            await expect(page.locator("//div[starts-with(@id,'shopping_cart')]//span")).toHaveText("1");
        });
    });
});