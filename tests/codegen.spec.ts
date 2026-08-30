import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).press('CapsLock');
  await page.getByRole('combobox', { name: 'Search' }).press('CapsLock');
  await page.getByRole('combobox', { name: 'Search' }).fill('cricinfo');
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dcricinfo%26sca_esv%3D216fa5c4d45a54f4%26source%3Dhp%26ei%3D0EZsaovDHM2ehvcPhuaMyQQ%26iflsig%3DABILxe8AAAAAamxU4HORMYWhyufVXnoBv79Mz_JsMOOE%26ved%3D0ahUKEwiL66ncqvyVAxVNj-EIHQYzI0kQ4dUDCB4%26uact%3D5%26oq%3Dcricinfo%26gs_lp%3DEgdnd3Mtd2l6IghjcmljaW5mbzIIEAAYgAQYsQMyBRAAGIAEMggQABiABBixAzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI40lQviFYjThwAXgAkAEAmAFxoAH4BaoBAzcuMbgBA8gBAPgBAZgCCaACwAaoAgrCAgoQABgDGI8BGOoCwgIREC4YgAQYsQMYgwEYxwEY0QPCAgsQABiABBixAxiDAcICDhAAGIAEGIoFGI0GGLEDwgIREC4YgAQYigUYjQYYsQMYgwHCAggQLhiABBixA8ICBRAuGIAEwgIHEAAYgAQYCpgDD_EFpreha4RCeZOSBwM1LjSgB78vsgcDNC40uAewBsIHBzAuMS43LjHIBzSACAE%26sclient%3Dgws-wiz%26sei%3D3EZsaorZN6GrhvcPh7H0WA&q=EgQmhoqYGN2NsdMGIjA55nKmWLfUbrbuHV2Aj2dZGzTtVcNl0hXBhURphAoSEhZyedU3yUliDl5abH63NTAyAVJaAUM');
  await page.locator('iframe[name="a-fx0cfwth6oaa"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="a-fx0cfwth6oaa"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-fx0cfwth6oaa"]').contentFrame().locator('[id="10"]').click();
  await page.locator('iframe[name="c-fx0cfwth6oaa"]').contentFrame().locator('[id="10"]').click();
  await page.locator('iframe[name="c-fx0cfwth6oaa"]').contentFrame().locator('[id="9"]').click();
  await page.locator('iframe[name="c-fx0cfwth6oaa"]').contentFrame().locator('[id="14"]').click();
  await page.locator('iframe[name="c-fx0cfwth6oaa"]').contentFrame().locator('[id="10"]').click();
  await page.locator('iframe[name="c-fx0cfwth6oaa"]').contentFrame().locator('[id="11"]').click();
  await page.locator('iframe[name="c-fx0cfwth6oaa"]').contentFrame().locator('[id="6"]').click();
  await page.locator('iframe[name="c-fx0cfwth6oaa"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.getByRole('link', { name: 'Cricinfo | Live Cricket' }).click();
  await page.getByRole('button', { name: 'Accept All' }).click();
});