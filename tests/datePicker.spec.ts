import { test, expect, Locator } from "@playwright/test";

test.describe("Date picker scripts", async () => {
  test("Future date and past date selection", async ({ page }) => {
    await test.step("Go to the automation page and select dates", async () => {
      await page.goto("https://testautomationpractice.blogspot.com/");
      const datePicker = await page.locator("#datepicker");
      await expect(datePicker).toBeVisible();
      await datePicker.fill("07/31/2026");
      await page.waitForTimeout(3000);

      const month = "August";
      const date = 31;
      const year = "2027";
      let dateMatched:boolean=true;
      while(dateMatched){
        const datePickerMonth = await page.locator(".ui-datepicker-month").innerText();
        const datePickerYear = await page.locator(".ui-datepicker-year").innerText();
        if(month === datePickerMonth && year === datePickerYear){
            dateMatched = false
            break;
        }
        await page.locator(".ui-datepicker-next").click();
      }
      await page.waitForTimeout(3000);

    });
  });
});
