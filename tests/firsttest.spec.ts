import { test, expect } from '@playwright/test';

test("First test title", async ({
    page
}) => {
    await test.step("Go to google and check title", async () => {
        await page.goto("https://www.google.com/");
        await expect(page).toHaveTitle("Google");
    });
})