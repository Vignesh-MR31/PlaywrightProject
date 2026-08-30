import { test, expect, Page } from "@playwright/test";

//Declaring the page fixture globally to avoid the conflict and use the same instance
let page: Page;
test.beforeAll("Open the application", async ({ browser }) => {
  //Create the Page
  page = await browser.newPage();
  await page.goto("https://www.saucedemo.com");
});
test.afterAll("Close the application", async ({}) => {
  //Closing the page
  page.close();
});
test.beforeEach("Login", async () => {
  await test.step("Login the application using username and password", async () => {
    await expect(
      page.locator("//div[@class='form_group'][1]/child::input"),
    ).toBeVisible();
    await page
      .locator("//div[@class='form_group'][1]/child::input")
      .fill("standard_user");
    await expect(
      page.locator("//div[@class='form_group'][2]/child::input"),
    ).toBeVisible();
    await page
      .locator("//div[@class='form_group'][2]/child::input")
      .fill("secret_sauce");
    await page
      .locator("//input[@id='login-button'][@name='login-button']")
      .click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});
test.afterEach("Logout the application", async () => {
  await page.locator("#react-burger-menu-btn").click();
  await page.locator("#logout_sidebar_link").click();
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});
test.describe("Tests", () => {
  //ancestor
  test("Verify the selection of product using XPath locator", async ({}) => {
    await test.step("Go to page, login, sort products and check the sorting", async () => {
      await page
        .locator("//img[@alt='Sauce Labs Backpack']/ancestor::div[1]")
        .waitFor({ state: "visible" });
      await expect(
        page.locator("//img[@alt='Sauce Labs Backpack']/ancestor::div[1]"),
      ).toBeVisible();
      await page
        .locator("//img[@alt='Sauce Labs Backpack']/ancestor::div[1]")
        .click();
      await expect(
        page.locator("//button[@id='back-to-products']/ancestor::div[1]"),
      ).toBeVisible();
      await page
        .locator("//button[@id='back-to-products']/ancestor::div[1]")
        .click();
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
  });
  //descendant
  test("Verify the addition of product to cart using XPath locator", async ({}) => {
    await test.step("Add product to cart and check the cart", async () => {
      await expect(
        page.locator("//div[@id='inventory_container']/descendant::img[2]"),
      ).toBeVisible();
      await page
        .locator("//div[@id='inventory_container']/descendant::img[2]")
        .click();
      await expect(
        page.locator("//div[contains(@class,'desc')]/descendant::button"),
      ).toBeVisible();
      await page
        .locator("//div[contains(@class,'desc')]/descendant::button")
        .click();
      await expect(
        page.locator("//div[contains(@class,'desc')]/descendant::button"),
      ).toHaveText("Remove");
    });
  });
});
