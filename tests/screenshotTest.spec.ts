import { test, expect } from "@playwright/test";

test("Login Test for Orange HRM - Screenshot", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').fill("Admin");
  await page.locator('[name="password"]').fill("admin123");
  /*await page.screenshot({
    path: "tests/screenshots/" + "LoginPage.png",
  });*/
  await page.locator('[type="submit"]').click();
  await page.locator(".oxd-userdropdown-tab").click();
  /*await page.screenshot({
    path: "tests/screenshots/" + "HomePage.png",
  });*/
  await page.locator('//a[contains(@href, "logout")]').click();
  await page.close();
});
