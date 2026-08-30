import {test,expect} from "@playwright/test";

test.describe("Verify the Comparing Method Actions", () => {
    test("Go to page and check the comparing method actions", async ({ page }) => {
        await page.goto("https://demowebshop.tricentis.com/");
        const productItems = await page.locator(".product-item");

        //innerText - Gets the text content of the element excluding hidden elements and extra whitespace, and returns it as a string.
        const count = await productItems.count();
        for(let i = 0; i < count; i++) {
            const productName = await productItems.nth(i).locator("h2").innerText();
            console.log(productName);
        }

        //textContent - Gets the text content of the element including hidden elements and extra whitespace, and returns it as a string.
        for(let i = 0; i < count; i++) {
            const productName = await productItems.nth(i).locator("h2").textContent();
            console.log(productName);
        }

        //allInnerTexts - Gets the text content of all the elements in the locator excluding hidden elements and extra whitespace, and returns it as an array of strings.
        const allProductNames = await productItems.locator("h2").allInnerTexts();
        console.log(allProductNames);

        //allTextContents - Gets the text content of all the elements in the locator including hidden elements and extra whitespace, and returns it as an array of strings.
        const allProductNamesTextContent = await productItems.locator("h2").allTextContents();
        console.log(allProductNamesTextContent);
    });
});