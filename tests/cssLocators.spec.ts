import {test,expect} from "@playwright/test";

test.describe("Verify the CSS locators", () => {
    //tag.class
    test.beforeEach("Verify the navigation to the URL using CSS locator", async ({page}) => {
        await test.step("Go to page and check the URL", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("div.login_logo")).toBeVisible();
            await expect(page.locator("div.login_logo")).toHaveText("Swag Labs");
            await expect(page).toHaveURL("https://www.saucedemo.com/");
        });
    });
    //tag#id
    test("Verify the login functionality using CSS locator", async ({page}) => {
        await test.step("Go to page, login and check the URL", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("input#user-name")).toBeVisible();
            await page.locator("input#user-name").fill("standard_user");
            await expect(page.locator("input#password")).toBeVisible();
            await page.locator("input#password").fill("secret_sauce");
            await page.locator("input#login-button").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });
    });
    //tag[attribute='value']
    test("Verify the selection of product using CSS locator", async ({page}) => {
        await test.step("Go to page, login, sort products and check the sorting", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("#user-name")).toBeVisible();
            await page.locator("#user-name").fill("standard_user");
            await expect(page.locator("#password")).toBeVisible();
            await page.locator("#password").fill("secret_sauce");
            await page.locator("#login-button").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("img[alt='Sauce Labs Bike Light']")).toBeVisible();
            await page.locator("img[alt='Sauce Labs Bike Light']").click();
            await expect(page.locator("button[name='back-to-products']")).toBeVisible();
            await page.locator("button[name='back-to-products']").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        });
    });
    //tag.class[attribute='value']
    //tag#id[attribute='value']
    test("Verify the addition of product to cart using CSS locator", async ({page}) => {
        await test.step("Go to page, login, add product to cart and check the cart", async () => {
            await page.goto("https://www.saucedemo.com/");
            await expect(page.locator("#user-name")).toBeVisible();
            await page.locator("#user-name").fill("standard_user");
            await expect(page.locator("#password")).toBeVisible();
            await page.locator("#password").fill("secret_sauce");
            await page.locator("#login-button").click();
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            await expect(page.locator("img.inventory_item_img[alt='Sauce Labs Bike Light']")).toBeVisible();
            await page.locator("img.inventory_item_img[alt='Sauce Labs Bike Light']").click();
            await expect(page.locator("button#add-to-cart[name='add-to-cart']")).toBeVisible();
            await page.locator("button#add-to-cart[name='add-to-cart']").click();
             await expect(page.locator("button#remove[name='remove']")).toBeVisible();
        });
    });
});