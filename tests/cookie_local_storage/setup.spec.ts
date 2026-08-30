import { test as setup } from '@playwright/test';
import { login } from './base';
import fs from 'fs';

//Local Storage setup
setup('authenticate', async ({ page }) => {
  await login(page);

  await page.context().storageState({
    path: 'playwright/.auth/user.json'
  });
});

//Session Storage setup
// setup('Session storage authenticate', async ({ page }) => {
//   await login(page);
//   //Capturing the session storage data
//   const sessionStorageData = await page.evaluate(() => {
//     return sessionStorage;
//   });
//   //Writing the session storage data to a file
//   fs.writeFileSync(
//     'playwright/.auth/sessionStorage.json',
//     JSON.stringify(sessionStorageData)
//   );
// });