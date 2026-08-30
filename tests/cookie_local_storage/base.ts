export async function login(page) {
  await page.goto("https://sdetqa.vercel.app/login_app");
  await page.locator("#username").fill("admin");
  await page.locator("#password").fill("admin123");
  await page.locator("input[value='localStorage']").click();
  //await page.locator("input[value='sessionStorage']").click();
  await page.locator("button[type='submit']").click();
}
