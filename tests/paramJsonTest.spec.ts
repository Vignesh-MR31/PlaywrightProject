import { test, expect } from "@playwright/test";
import fs from "fs";

const path = "testData/users.json";
const jsonData = JSON.parse(fs.readFileSync(path, "utf-8"));
const path2 = "testData/users2.json";
const jsonData2 = JSON.parse(fs.readFileSync(path2, "utf-8"));

test.describe("Data from Json", async () => {
  for (const { username, password } of jsonData) {
    test(`Login Test for ${username}`, async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await page.locator("#user-name").fill(username);
      await page.locator("#password").fill(password);
      await page.locator("#login-button").click();
      if (username === "locked_out_user") {
        const expectedError =
          "Epic sadface: Sorry, this user has been locked out.";
        await expect(page.locator("h3")).toBeVisible();
        await expect(page.locator("h3")).toHaveText(expectedError);
      } else {
        await expect(page.locator("span[data-test='title']")).toBeVisible();
        await expect(page.locator("span[data-test='title']")).toHaveText(
          "Products",
        );
        await expect(page).toHaveURL(
          "https://www.saucedemo.com/inventory.html",
        );
      }
    });
  }
});
test.describe("Data from Json 2", async () => {
  test(`Login Test for ${jsonData2.username.standard_user}`, async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill(jsonData2.username.standard_user);
    await page.locator("#password").fill(jsonData2.password);
    await page.locator("#login-button").click();
    await expect(page.locator("span[data-test='title']")).toBeVisible();
    await expect(page.locator("span[data-test='title']")).toHaveText(
      "Products",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
  test(`Login Test for ${jsonData2.username.locked_out_user}`, async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill(jsonData2.username.locked_out_user);
    await page.locator("#password").fill(jsonData2.password);
    await page.locator("#login-button").click();
    const expectedError = "Epic sadface: Sorry, this user has been locked out.";
    await expect(page.locator("h3")).toBeVisible();
    await expect(page.locator("h3")).toHaveText(expectedError);
  });
  test(`Login Test for ${jsonData2.username.problem_user}`, async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill(jsonData2.username.problem_user);
    await page.locator("#password").fill(jsonData2.password);
    await page.locator("#login-button").click();
    await expect(page.locator("span[data-test='title']")).toBeVisible();
    await expect(page.locator("span[data-test='title']")).toHaveText(
      "Products",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
  test(`Login Test for ${jsonData2.username.performance_glitch_user}`, async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill(jsonData2.username.performance_glitch_user);
    await page.locator("#password").fill(jsonData2.password);
    await page.locator("#login-button").click();
    await expect(page.locator("span[data-test='title']")).toBeVisible();
    await expect(page.locator("span[data-test='title']")).toHaveText(
      "Products",
    );
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});
