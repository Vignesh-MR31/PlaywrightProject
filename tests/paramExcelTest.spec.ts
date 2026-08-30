//Pre-requesite - Install the xlsx - npm install xlsx
import { test, expect } from "@playwright/test";
import fs from "fs";
import * as XLSX from "xlsx";

//file -> workbook -> sheets -> rows and columns
const path = "testData/TestDataExcel.xlsx";
const workbook = XLSX.readFile(path);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

//convert sheet into json
const loginData:any = XLSX.utils.sheet_to_json(sheet);


test.describe("CSV login tests", () => {
  for (const {username, password} of loginData) {
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
