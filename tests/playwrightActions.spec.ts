import { test, expect } from "@playwright/test";

test.describe("Verify the Playwright Actions", () => {

    test("Text Input Actions", async ({ page }) => {
        await test.step("Go to page and check the click action", async () => {
            await page.goto("https://testautomationpractice.blogspot.com/");
            await expect(page.locator("#name")).toBeVisible();
            await expect(page.locator("#name")).toBeEnabled();
            await expect(page.locator("#name")).toBeEditable();
            await page.locator("#name").fill("John Doe");
            const maxLength = await page.getAttribute("#name", "maxlength");
            await expect(maxLength).toBe("15");
            const text = await page.locator("#name").inputValue();
            await expect(text).toBe("John Doe");
        })
    });
    test("Radio Button Actions", async ({ page }) => {
        await test.step("Go to page and check the radio button actions", async () => {
            await page.goto("https://testautomationpractice.blogspot.com/");
            const maleRadioButton = page.locator("#male");
            await expect(maleRadioButton).toBeVisible();
            await expect(maleRadioButton).toBeEnabled();
            await maleRadioButton.check();
            expect(await maleRadioButton.isChecked()).toBe(true);
            await expect(maleRadioButton).toBeChecked();
            const femaleRadioButton = page.locator("#female");
            await femaleRadioButton.check();
            expect(await femaleRadioButton.isChecked()).toBe(true);
            await expect(femaleRadioButton).toBeChecked();
            await maleRadioButton.uncheck();
            //await expect(maleRadioButton).not.toBeChecked();
        });
    });

    test("Checkbox Actions", async ({ page }) => {
        await test.step("Go to page and check the checkbox actions", async () => {
            await page.goto("https://testautomationpractice.blogspot.com/");
            const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
            const particularDay = false;
            const specificDay = "monday";
            for (const day of days) {
                const checkbox = particularDay? page.locator(`#${specificDay}`) : page.locator(`#${day}`);
                if (!particularDay) {
                    await checkbox.check();
                    await expect(checkbox).toBeChecked();
                    //await checkbox.uncheck();
                    //await expect(checkbox).not.toBeChecked();
                }
                else {
                    await checkbox.check();
                    await expect(checkbox).toBeChecked();
                    await checkbox.uncheck();
                    await expect(checkbox).not.toBeChecked();
                    return;
                }
            }
            //Only need last 3 days to be checked
            for(const day of days.slice(-3)) {
                const checkbox = page.locator(`#${day}`);
                await checkbox.uncheck();
                await expect(checkbox).not.toBeChecked();
            }
            //Now uncheck the checked one and check the unchecked one
            for (const day of days) {
                const checkbox = page.locator(`#${day}`);
                if (await checkbox.isChecked()) {
                    await checkbox.uncheck();
                    await expect(checkbox).not.toBeChecked();
                } else {
                    await checkbox.check();
                    await expect(checkbox).toBeChecked();
                }
            }
        });
    });
});