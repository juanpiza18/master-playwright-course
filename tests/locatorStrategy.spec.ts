import { test, expect } from "@playwright/test";

test("Different Locator Strategy", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('id="user-name"').fill("standard_user");
  await page.locator("#password").fill("secret_sauce");

  // CSS and XPath.
  /*await page.locator('css=button').click();
  await page.locator('xpath=//button').click();
  
  await page.locator('button').click();
  await page.locator('//button').click();*/
  // Text
  //await page.locator("text=Login").click();
  await page.locator('input:has-text("Login")').click();
  //await page.getByText("Login").click();
});

// How to locate elements with palywright inspector.
test("Different Locator Strategy with palwright", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.pause();
});
