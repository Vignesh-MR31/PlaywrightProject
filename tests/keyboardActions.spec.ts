import { test, expect } from "@playwright/test";
import * as fs from 'fs';

test.describe("Keyboard actions", async () => {
  test("Method 1 - Copy, Paste, Tab", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const inputOne = await page.locator("#input1");
    await inputOne.focus();
    await page.keyboard.insertText("Testing");
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await page.keyboard.down("Control");
    await page.keyboard.press("C");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.down("Control");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");
    await page.waitForTimeout(2000);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.down("Control");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");
  });
  test("Method 2 - Copy, Paste, Tab", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const inputOne = await page.locator("#input1");
    await inputOne.focus();
    await page.keyboard.insertText("Testing");
    await page.keyboard.press("Control+A");
    await page.waitForTimeout(2000);
    await page.keyboard.press("Control+C");
    await page.waitForTimeout(2000);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Control+V");
    await page.waitForTimeout(2000);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Control+V");
  });
  //file upload
  test("File Upload", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator('#singleFileInput').setInputFiles('UploadFile/Test1.txt');
    await page.locator('button', {hasText:'Upload Single File'}).click();
    const message = 'Single file selected: Test1.txt, Size: 23 bytes, Type: text/plain'
    const messageLocator = await page.locator('#singleFileStatus')
    await expect(messageLocator).toHaveText(message);
  });
  test("Multiple files Upload", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator('#multipleFilesInput').setInputFiles(['UploadFile/Test1.txt','UploadFile/Test2.txt']);
    await page.locator('button', {hasText:'Upload Multiple Files'}).click();
    await page.waitForTimeout(3000);
    const message = 'Multiple files selected:';
    const fileNameOne = 'Test1.txt';
    const fileNameTwo = 'Test1.txt';
    const messageLocator = await page.locator('#multipleFilesStatus')
    await expect(messageLocator).toContainText(message);
    await expect(messageLocator).toContainText(fileNameOne);
    await expect(messageLocator).toContainText(fileNameTwo);
  });
  //file download
  test("File download", async({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    await page.locator("#inputText").fill("Testing");
    await page.locator("#generateTxt").click();

    //Start waiting for the download before clicking
    const [download] = await Promise.all([page.waitForEvent('download'),
    page.locator("#txtDownloadLink").click()]);
    //Save in custom Path
    const downloadPath = 'DownloadFile/test.txt';
    await download.saveAs(downloadPath);
    //Verify the file exists in the path
    const status = fs.existsSync(downloadPath);
    await expect(status).toBeTruthy();
    //Delete the file
    if(status){
      fs.unlinkSync(downloadPath);
    }
  })
});
