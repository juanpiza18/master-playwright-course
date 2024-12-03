import { test, expect } from "@playwright/test";

test("Visible/ Hidden assertion", async ({ page }) => {
  await page.goto("https://sripriyakulkarni.com/");
  await page.getByText("Automation Practice").click();
  await expect(page.locator("#displayed-text")).toBeVisible();

  // hide field.
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  // show element.
  await page.locator("#show-textbox").click();
  await expect(page.locator("#displayed-text")).toBeVisible();

  await page.close();
});

test("Present / Not Present Assertion", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");

  await expect(page.locator("#elements > button")).toHaveCount(0);
  await expect(page.locator(".added-manually")).not.toHaveCount(1);

  const addElementButton = page.locator(".example > button");
  await addElementButton.click();

  await expect(page.locator("#elements > button")).toHaveCount(1);
  await expect(page.locator(".added-manually")).toHaveCount(1);

  await addElementButton.click();
  await expect(page.locator(".added-manually")).toHaveCount(2);

  const addedElementList = await page
    .locator(".added-manually")
    .elementHandles();

  for await (const element of addedElementList) {
    await element.click();
  }

  await expect(page.locator("#elements > button")).toHaveCount(0);
  await expect(page.locator(".added-manually")).not.toHaveCount(1);

  await page.close();
});

test("Enabled/Disabled Assertion", async ({ page }) => {
  await page.goto("https://letcode.in/buttons");
  await expect(page.locator("#property")).toBeEnabled();
  await expect(page.locator("#isDisabled.button.is-info")).toBeDisabled();
  await page.close();
});

test("Text Match/Mismatch Assertion", async ({ page }) => {
  await page.goto("https://letcode.in/buttons");
  await expect(page.locator("#color")).toHaveText("What is my color?");
  await expect(page.locator("#color")).not.toHaveText("abcd");
  await page.close();
});

test("Element Attribute Assertion", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await expect(page.locator('input[name="username"]')).toHaveAttribute(
    "name",
    "username"
  );
  // For class we need to use regular expression.
  await expect(page.locator('input[name="username"]')).toHaveAttribute(
    "class",
    /.*oxd-input/
  );
  await page.close();
});

test("URL  Assertion", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  // full URL assertion
  await expect(page).toHaveURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  // partial URL assertion
  await expect(page).toHaveURL(/demo.orangehrmlive/);

  await page.close();
});

test("Title Assertion", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  // full  assertion
  await expect(page).toHaveTitle("OrangeHRM");

  // Partial assertion
  await expect(page).toHaveTitle(/.*HRM/);

  await page.close();
});

test("Screenshot  Assertion", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");
  await expect(page).toHaveScreenshot();
  await page.close();
});
