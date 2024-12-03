import { test, expect } from "@playwright/test";

// Two methods to input the text fill
// Type it is deprecated, so Playwright Team suggested to use fill instead
// Filll will write the values directly into the text box within a fraction.
test("Fill Method", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').fill("Admin");
  await page.locator('[name="password"]').fill("admin123");
  await page.locator('[type="submit"]').click();
  await page.locator(".oxd-userdropdown-tab").click();
  await page.close();
});

// Press sequencially it willl press the letters one by one.
test("Press - Sequentially Method", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').pressSequentially("Admin");
  await page.locator('[name="password"]').pressSequentially("admin123");
  await page.locator('[name="password"]').press("Enter");
  await page.locator(".oxd-userdropdown-tab").click();
  await page.locator("text=Logout").click();
  await page.close();
});

test("Press - Sequentially Method with delay", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').pressSequentially("Admin", {
    delay: 200,
  });
  await page.locator('[name="password"]').pressSequentially("admin123", {
    delay: 200,
  });
  await page.locator('[name="password"]').press("Enter");
  await page.locator(".oxd-userdropdown-tab").click();
  await page.locator("text=Logout").click();
  await page.close();
});
