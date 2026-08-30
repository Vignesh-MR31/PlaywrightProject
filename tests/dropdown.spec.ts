import { test, expect } from "@playwright/test";

test.describe("Verify the Dropdown Actions", () => {
  test("Static Dropdown Actions", async ({ page }) => {
    await test.step("Go to page and check the static dropdown actions", async () => {
      await page.goto("https://testautomationpractice.blogspot.com/");
      const countryDropdown = page.locator("#country");
      await expect(countryDropdown).toBeVisible();
      await countryDropdown.click();
      await countryDropdown.selectOption("India");
      await page.waitForTimeout(3000);
      await countryDropdown.selectOption({ value: "uk" });
      await page.waitForTimeout(3000);
      await countryDropdown.selectOption({ label: "China" });
      await page.waitForTimeout(3000);
      await countryDropdown.selectOption({ index: 5 });
      await expect(countryDropdown).toHaveValue("australia");

      //count the number of options in the dropdown
      const options = page.locator("#country>option");
      const optionsCount = await options.count();
      console.log(optionsCount);
      await expect(optionsCount).toBe(10);

      //Get the text of all the options in the dropdown
      const optionsText = (await options.allTextContents()).map((text) =>
        text.trim(),
      );
      console.log(optionsText);
      await expect(optionsText).toContain("India");
    });
  });

  test("Multiple selection Dropdown Actions", async ({ page }) => {
    await test.step("Go to page and check the multiple selection dropdown actions", async () => {
      await page.goto("https://testautomationpractice.blogspot.com/");
      const colorDropdown = page.locator("#colors");
      await expect(colorDropdown).toBeVisible();
      await colorDropdown.click();
      await colorDropdown.selectOption(["Red", "Blue"]);
      await page.waitForTimeout(3000);
      await colorDropdown.selectOption({ value: "yellow" });
      await page.waitForTimeout(3000);
      await colorDropdown.selectOption([
        { label: "Green" },
        { label: "White" },
      ]);
      await page.waitForTimeout(3000);
      await colorDropdown.selectOption([
        { index: 2 },
        { index: 4 },
        { index: 0 },
      ]);
      await page.waitForTimeout(3000);
    });
  });

  test("Sorting Multiple selection Dropdown Actions", async ({ page }) => {
    await test.step("Go to page and check the multiple selection dropdown actions", async () => {
      await page.goto("https://testautomationpractice.blogspot.com/");
      const animalDropdown = page.locator("#colors");
      await expect(animalDropdown).toBeVisible();
      await animalDropdown.click();

      const options = (
        await animalDropdown.locator("option").allTextContents()
      ).map((text) => text.trim());
      console.log(options);

      //spread operator to create a copy of the options array before sorting we are using because sort() method mutates the original array and we don't want to change the original options array
      const sortedOptions = [...options].sort();
      console.log(sortedOptions);
      expect(options).toEqual(sortedOptions);
    });
  });

  test("Checking if duplicate values are present in the dropdown", async ({
    page,
  }) => {
    await test.step("Go to page and check the multiple selection dropdown actions", async () => {
      await page.goto("https://testautomationpractice.blogspot.com/");
      const colorDropdownOptions = page.locator("#colors > option");
      const optionsText = (await colorDropdownOptions.allTextContents()).map(
        (text) => text.trim(),
      );

      const mySet = new Set<String>();
      const duplicateValues: String[] = [];
      for (const option of optionsText) {
        if (mySet.has(option)) {
          duplicateValues.push(option);
        } else {
          mySet.add(option);
        }
      }
      console.log(duplicateValues); 
    });
  });

  test("Printing the lowest price and highest price of the products", async ({ page }) => {
    await test.step("Go to page and check the multiple selection dropdown actions", async () => {
      await page.goto("https://www.bstackdemo.com/");
      await page.locator(".sort > select").waitFor({ state: "visible" });
      await page.locator(".sort > select").click();
      await page.locator(".sort > select").selectOption({value:"lowestprice"});
      const productName = page.locator(".shelf-item > p");
      const productPrice = page.locator(".shelf-item > .shelf-item__price > .val");
      const totalProducts = await productName.count();
      const map = new Map<string, string>();
      for (let i = 1; i < totalProducts; i++) {
        const name = await productName.nth(i).innerText();
        const price = await productPrice.nth(i).innerText();
        console.log(`Product: ${name}, Price: ${price}`);
        if (name && price) {
          map.set(name.trim(), price.trim());
        }
      }
      console.log(map);
      console.log(map.size);
    });
  });
});

test.describe("Verify auto suggest dropdown actions", () => {
  test("Auto suggest dropdown actions", async ({ page }) => {
    await test.step("Go to page and check the auto suggest dropdown actions", async () => {
      await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
      await page.locator("input[name='username']").fill("Admin");
      await page.locator("input[name='password']").fill("admin123");
      await page.locator("button[type='submit']").click();
      await page.locator("li span").nth(1).click();
      await page.locator("form div i").nth(2).click();
      await page.waitForTimeout(3000);
      const autoSuggestOptions = await page.locator("div[role='option'] span");
      const optionsCount = await autoSuggestOptions.count();
      for (let i = 0; i < optionsCount; i++) {
        const optionText = await autoSuggestOptions.nth(i).innerText();
        if(optionText.trim() === "Automaton Tester") {
          await autoSuggestOptions.nth(i).click();
          break;
        }
      }
      await page.waitForTimeout(3000);
    });
  });
});
