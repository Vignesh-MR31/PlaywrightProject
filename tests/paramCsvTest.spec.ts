//Pre-requesite - Install the CSV parser - npm install csv-parse
import { test, expect } from "@playwright/test";
import fs from "fs";
import { parse } from "csv-parse/sync";

const path = "testData/TestData.csv";
const fileContent = fs.readFileSync(path, "utf-8");

const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
}) as Array<{ username: string; password: string }>;

test.describe("CSV login tests", () => {
  for (const data of records) {
    test(`Login Test for ${data.username}`, async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await page.locator("#user-name").fill(data.username);
      await page.locator("#password").fill(data.password);
      await page.locator("#login-button").click();

      if (data.username === "locked_out_user") {
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
