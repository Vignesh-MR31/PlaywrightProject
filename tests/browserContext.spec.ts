import { test, expect, chromium } from "@playwright/test";

test.describe("Browser context", () => {
  test("Without Page fixture", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    await page1.goto("https://ui.vision/demo/webtest/frames/");
    await page1.waitForTimeout(3000);
    await page2.goto("https://playwright.dev/docs/frames");
    await page2.waitForTimeout(3000);
  });
  test("Switching the tabs", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://testautomationpractice.blogspot.com/");

    const [page2] = await Promise.all([
      context.waitForEvent("page"),
      page1.locator("button", { hasText: "New Tab" }).click(),
    ]);
    console.log(await page1.title());
    console.log(await page2.title());
  });
  test("Switching the popup windows", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://testautomationpractice.blogspot.com/");

    const [page2] = await Promise.all([
      page1.waitForEvent("popup"),
      page1.locator("#PopUp").click(),
    ]);

    const allPopups = context.pages();
    console.log(allPopups.length);
    console.log(allPopups[0].url());
    console.log(allPopups[1].url());
  });
  test("Authentication popup without browser context", async ({ page }) => {
    //https://username:username@the-internet.herokuapp.com/digest_auth
    await page.goto(
      "https://admin:admin@the-internet.herokuapp.com/digest_auth",
    );
    await expect(page.locator("text=Congratulations")).toBeVisible();
  });
  test("Authentication popup with browser context", async ({}) => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      httpCredentials: {
        username: "admin",
        password: "admin",
      },
    });
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/digest_auth");
  });
});
