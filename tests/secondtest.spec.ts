import { test, expect } from '@playwright/test';

test("First test URL", async ({
    page
}) => {
    await test.step("Go to google and check url", async () => {
        await page.goto("https://www.google.com/");
        await expect(page).toHaveURL("https://www.google.com/");
    });
})