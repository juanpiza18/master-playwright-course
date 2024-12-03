import { test, expect } from "@playwright/test";

test("Login Test for Orange HRM", async ({ page, context }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').fill("Admin");
  await page.locator('[name="password"]').fill("admin123");

  await page.locator('[type="submit"]').click();

  const dashboardTitle = await page
    .locator('//h6[contains(@class, "oxd-topbar-header")]')
    .innerText();
  expect(dashboardTitle).toEqual("Dashboard");
  // open the user dropdown
  await page.locator(".oxd-userdropdown-tab").click();
  await page.locator('//a[contains(@href, "logout")]').click();

  const loginTitle = await page
    .locator('//h5[contains(@class, "orangehrm-login-title")]')
    .innerText();
  expect(loginTitle).toEqual("Login");
  await page.close();
});
