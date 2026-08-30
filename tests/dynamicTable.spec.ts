import { test, expect, Locator } from "@playwright/test";

test.describe("Verify the Dynamic Table Actions", () => {
  test("Get the values from dynamic table and verify the values", async ({
    page,
  }) => {
    let table: Locator;
    await test.step("Go to page and verify the table values", async () => {
      await page.goto("https://practice.expandtesting.com/dynamic-table");
      table = page.locator("table");
      await expect(table).toBeVisible();
    });
    await test.step("Verify the CPU percentage of google", async () => {
      const rows = await table.locator("//tbody//tr").all();
      const rowsCount = rows.length;
      expect(rowsCount).toBe(4);
      let processName;
      let cpu;
      for (const row of rows) {
        processName = await row.locator("td").nth(0).innerText();
        if (processName === "Chrome") {
          cpu = await row.locator("td", { hasText: "%" }).innerText();
          break;
        }
      }
      console.log({ processName });
      console.log({ cpu });
      const expectedString = await page.locator("#chrome-cpu").innerText();
      const actualString = `${processName} CPU: ${cpu}`;
      console.log({ expectedString });
      console.log({ actualString });
      await expect(expectedString).toContain(cpu);
    });
  });

  test("Get the values from all the pages in the table", async ({ page }) => {
    let table: Locator;
    await test.step("Go to page and verify the table values", async () => {
      await page.goto("https://datatables.net/");
      table = page.locator("#example");
      await expect(table).toBeVisible();
    });
    await test.step("Verify the data in the each pages", async () => {
      let hasMorePages = true;
      while (hasMorePages) {
        const rows = await table.locator("tbody tr").all();
        for (const row of rows) {
          console.log(await row.innerText());
        }
        const button = await page.locator("//nav//button").nth(8);
        const buttonStatus = await button.getAttribute("aria-disabled");
        if(buttonStatus?.includes("true")){
            hasMorePages = false;
        }
        else{
           button.click();
        }
        await page.waitForTimeout(1500);
      }
      //console.log((await rows.allInnerTexts()).map(row => row.replace('\t',' ')));
    });
  });
  test("Get the total rows table from the table after changing the entries from the page", async ({
    page,
  }) => {
    let table: Locator;
    await test.step("Go to page and verify the table values", async () => {
      await page.goto("https://datatables.net/");
      table = page.locator("#example");
      await expect(table).toBeVisible();
    });
    await test.step("Verify the data in the each pages", async () => {
      const rows = await table.locator("//tbody//tr");
      const totalData = 57;
      const select = page.locator("select");
      const options = await select.locator("option").allInnerTexts();
      for (const option of options) {
        await select.click();
        await select.selectOption({ value: option });
        const rowCount = await rows.count();
        if (option === "100") {
          expect(rowCount).toBe(totalData);
        } else {
          expect(rowCount).toBe(parseInt(option));
        }
      }
    });
  });
  test("BlazeDemo – Flight Booking Automation", async({page}) =>{
    await test.step("Navigate to BlazeDemo page and select the Departure and Destination", async() => {
        await page.goto("https://blazedemo.com/");
        const departure = page.locator("//select[@name='fromPort']");
        await departure.selectOption({value:"Boston"});
        const destination = page.locator("//select[@name='toPort']");
        await destination.selectOption({value:"London"});
        await page.locator("input[value='Find Flights']").click();
    });
    await test.step("Verify the table list and select the lowest price flight", async() => {
        const table = await page.locator(".table");
        await expect(table).toBeVisible();
        const rows = await table.locator("tbody tr").all();
        const prices:number[]=[];
        for(const row of rows){
            const price = await row.locator("td").nth(5).innerText();
            prices.push(parseFloat(price.replace("$",'')));
            console.log(await row.innerText());
        }
        console.log({prices});
        //sort the prices
        prices.sort((a, b) => a - b);
        //Sorted in ascending order
        console.log({prices});
        const lowestPrice = prices[0];
        //Select the flight
        for(const row of rows){
            const price = await row.locator("td").nth(5).innerText();
            if((parseFloat(price.replace("$",''))) === lowestPrice){
                await row.locator("td").nth(0).click();
                break;
            }
        }
        await expect(page.locator("h2")).toBeVisible();
    });
    await test.step("Fill the details and book the flight", async() => {
        await page.locator("#inputName").fill("John");
        await page.locator("#address").fill("1403 American Beauty Ln");
        await page.locator("#city").fill("Columbus");
        await page.locator("#state").fill("OH");
        await page.locator("#zipCode").fill("43240");
        await page.locator("#creditCardNumber").fill("6789 0673 4523 1267");
        await page.locator("#creditCardYear").fill("2026");
        await page.locator("#nameOnCard").fill("John Canedy");
        await page.locator("input[value='Purchase Flight']").click();

        const title = await page.locator("h1").nth(0);
        await title.isVisible();
        const expectedText = "Thank you for your purchase today!"
        const actualText = await title.innerText();
        await expect(actualText).toBe(expectedText)
    });
  })
});
