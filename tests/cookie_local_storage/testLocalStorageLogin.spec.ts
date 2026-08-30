import { test, expect, chromium } from "@playwright/test";

test.describe("Dashboard test", async () => {
  //Local Storage
  test("Dashboard test 1", async ({ page }) => {
    await page.context().storageState({ path: "playwright/.auth/user.json" });
    await page.goto("https://sdetqa.vercel.app/login_app");
    await expect(page.locator("#activeStorageBadge")).toHaveText(
      " Local Storage",
    );
    await expect(page.locator("div .greeting")).toContainText(" Dashboard ");
    await expect(page.locator("#displayUser")).toHaveText("admin");
  });
  test("Dashboard test 2", async ({ page }) => {
    await page.context().storageState({ path: "playwright/.auth/user.json" });
    await page.goto("https://sdetqa.vercel.app/login_app");
    await expect(page.locator("#activeStorageBadge")).toHaveText(
      " Local Storage",
    );
    await expect(page.locator("#displayUser")).toHaveText("admin");
  });

  //Session Storage
  //   test("Dashboard test 3", async ({ browser }) => {
  //     const context = await browser.newContext();

  //     const sessionStorageData = JSON.parse(
  //       require("fs").readFileSync(
  //         "playwright/.auth/sessionStorage.json",
  //         "utf-8",
  //       ),
  //     );

  //     await context.addInitScript((storage) => {
  //       for (const [key, value] of Object.entries(storage)) {
  //         window.sessionStorage.setItem(key, value as string);
  //       }
  //     }, sessionStorageData);

  //     const page = await context.newPage();

  //     await page.goto("https://sdetqa.vercel.app/login_app");
  //     await expect(page.locator("#activeStorageBadge")).toHaveText(
  //       " Session Storage",
  //     );
  //     await expect(page.locator("div .greeting")).toContainText(" Dashboard ");
  //     await expect(page.locator("#displayUser")).toHaveText("admin");
  //   });
  //   test("Dashboard test 4", async ({ browser }) => {
  //     const context = await browser.newContext();

  //     const sessionStorageData = JSON.parse(
  //       require("fs").readFileSync(
  //         "playwright/.auth/sessionStorage.json",
  //         "utf-8",
  //       ),
  //     );

  //     await context.addInitScript((storage) => {
  //       for (const [key, value] of Object.entries(storage)) {
  //         window.sessionStorage.setItem(key, value as string);
  //       }
  //     }, sessionStorageData);

  //     const page = await context.newPage();
  //     await page.goto("https://sdetqa.vercel.app/login_app");
  //     await expect(page.locator("#activeStorageBadge")).toHaveText(
  //       " Session Storage",
  //     );
  //     await page.goto("https://sdetqa.vercel.app/login_app");
  //     await expect(page.locator("#displayUser")).toHaveText("admin");
  //   });
});
