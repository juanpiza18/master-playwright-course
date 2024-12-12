import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const orangeHRMData = parse(
  fs.readFileSync(path.join(__dirname, "data", "orangeHRMCreds.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

test(`Login Test with valid credentials from csv`, async ({ page }) => {
  const user = orangeHRMData[0];
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').fill(user.username);
  await page.locator('[name="password"]').fill(user.password);
  await page.locator('[type="submit"]').click();
  await page.locator(".oxd-userdropdown-tab").click();
  await page.locator('//a[contains(@href, "logout")]').click();
  await page.close();
});

test(`Login Test with invalid credentials from csv`, async ({ page }) => {
  const invalidUser = orangeHRMData[1];
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await page.locator('[name="username"]').fill(invalidUser.username);
  await page.locator('[name="password"]').fill(invalidUser.username);
  await page.locator('[type="submit"]').click();
  await expect(
    page.locator(".oxd-alert-content.oxd-alert-content--error")
  ).toHaveText("Invalid credentials");
  await page.close();
});
