/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/
import {test, expect, Locator} from '@playwright/test';

test("Verify the page.getByAltText() locator", async ({
    page
}) => {
    await test.step("Go to page and check the alt text of the image", async () => {
        await page.goto("https://demo.nopcommerce.com/");
        const googleLogo:Locator = page.getByAltText("nopCommerce demo store");
        await expect(googleLogo).toBeVisible();
        await page.getByAltText("nopCommerce demo store").click();
        await expect(page).toHaveURL("https://demo.nopcommerce.com/");
    });
});

test("Verify the page.getByText() locator", async ({
    page
}) => {
    await test.step("Go to page and check the element with text", async () => {
        await page.goto("https://demo.nopcommerce.com/");
        await page.getByText("Computers").click();
        await expect(page).toHaveURL("https://demo.nopcommerce.com/computers");
    });
});

test("Verify the page.getByRole() locator", async ({page}) => {
    await test.step("Go to page and check the element with role", async () => {
        await page.goto("https://tutorialsninja.com/demo/");
        await page.getByRole("link", {name: "My Account"}).first().click();
        await expect(page.getByRole("link", {name: "Register"})).toBeVisible();
        await page.getByRole("link", {name: "Register"}).click();
        await expect(page.getByRole("heading", {name: "Register Account"})).toBeVisible();
    });
});

test("Verify the page.getByLabel() locator", async ({page}) => {
    await test.step("Go to page and check the element with label", async () => {
        await page.goto("https://tutorialsninja.com/demo/index.php?route=account/register");
        await page.getByLabel("First Name").fill("John");
        await page.getByLabel("Last Name").fill("Doe");
        await page.getByLabel("E-mail").fill("john.doetest@example.com");
        await page.getByLabel("Telephone").fill("123-456-7890");
        await page.getByLabel("Password").first().fill("Password123");
        await page.getByLabel("Password Confirm").last().fill("Password123");
        //await page.getByRole("checkbox", {name: "Privacy Policy"}).check();
        await page.locator("input[type='checkbox'][name='agree']").check();
        await page.getByRole("button", {name: "Continue"}).click();
        await expect(page.getByRole("heading", {name: "Your Account Has Been Created!"})).toBeVisible();
    });
});

test("Verify the page.getByPlaceholder() locator", async ({page}) => {
    await test.step("Go to page and check the element with placeholder", async () => {
        await page.goto("https://www.saucedemo.com/");
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();
        await expect(page.getByText("Products")).toBeVisible();
    });
});

test("Verify the page.getByTitle() locator", async ({page}) => {
    await test.step("Go to page and check the element with title", async () => {
        await page.goto("https://tutorialsninja.com/demo/");
        await page.getByRole("link", {name: "My Account"}).first().click();
        await expect(page.getByRole("link", {name: "Login"})).toBeVisible();
        await page.getByRole("link", {name: "Login"}).click();
        await page.getByPlaceholder("E-Mail Address").fill("john.doetest@example.com");
        await page.getByPlaceholder("Password").fill("Password123");
        await page.getByRole("button", {name: "Login"}).click();
        await expect(page.getByTitle("Wish List (0)")).toBeVisible();
        await page.getByTitle("Wish List (0)").click();
        await expect(page.getByRole("heading", {name: "My Wish List"})).toBeVisible();
    });
});

test("Verify the page.getByTestId() locator", async ({page}) => {
    await test.step("Go to page and check the element with test id", async () => {
        await page.goto("https://www.saucedemo.com/");
        await page.getByTestId("username").fill("standard_user");
        await page.getByTestId("password").fill("secret_sauce");
        await page.getByRole("button", {name: "Login"}).click();
        await expect(page.getByTestId("product_label")).toBeVisible();
    });
});