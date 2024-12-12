import { test, expect } from "@playwright/test";
import * as orangeHrmData from "./data/orangeHRMCredentials.json";

test(`Login Test with valid credentials`, async ({ page }) => {
  const user = orangeHrmData[0];
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').fill(user.username);
  await page.locator('[name="password"]').fill(user.password);
  await page.locator('[type="submit"]').click();
  await page.locator(".oxd-userdropdown-tab").click();
  await page.locator('//a[contains(@href, "logout")]').click();
  await page.close();
});

test(`Login Test with invalid credentials`, async ({ page }) => {
  const invalidUser = orangeHrmData[1];
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').fill(invalidUser.username);
  await page.locator('[name="password"]').fill(invalidUser.username);
  await page.locator('[type="submit"]').click();
  await expect(
    page.locator(".oxd-alert-content.oxd-alert-content--error")
  ).toHaveText("Invalid credentials");
  await page.close();
});
