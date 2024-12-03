import { test, expect } from "@playwright/test";

test("Radio Button Handling", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Register.html");
  const maleRadioButton = page.locator(
    "//input[contains(@type, 'radio') and @value='Male']"
  );
  const femaleRadioButton = page.locator('input[value="FeMale"]');
  // Way 1 Assertion
  await expect(maleRadioButton).not.toBeChecked();
  await expect(femaleRadioButton).not.toBeChecked();

  // Way 2 assertion
  expect(await maleRadioButton.isChecked()).toBeFalsy();
  expect(await femaleRadioButton.isChecked()).toBeFalsy();
  // instead of click method for radio and checkbox
  // we should use check method
  await maleRadioButton.check();
  await femaleRadioButton.check();
  // Assertion check that only one radio button is checked
  await expect(femaleRadioButton).toBeChecked();
  await expect(maleRadioButton).not.toBeChecked();

  expect(await maleRadioButton.isChecked()).toBeFalsy();
  expect(await femaleRadioButton.isChecked()).toBeTruthy();

  await page.close();
});

test("Checkboxes Handling", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Register.html");
  const cricketChecbox = page.locator('input[value="Cricket"]');
  const moviesCheckbox = page.locator('input[value="Movies"]');
  const hockeyCheckbox = page.locator('input[value="Hockey"]');
  //way 1
  await expect(cricketChecbox).not.toBeChecked();
  await expect(moviesCheckbox).not.toBeChecked();
  await expect(hockeyCheckbox).not.toBeChecked();
  // way 2
  expect(await cricketChecbox.isChecked()).toBeFalsy();
  expect(await moviesCheckbox.isChecked()).toBeFalsy();
  expect(await hockeyCheckbox.isChecked()).toBeFalsy();

  await cricketChecbox.check();
  await moviesCheckbox.check();
  await hockeyCheckbox.check();

  expect(await cricketChecbox.isChecked()).toBeTruthy();
  expect(await moviesCheckbox.isChecked()).toBeTruthy();
  expect(await hockeyCheckbox.isChecked()).toBeTruthy();

  await cricketChecbox.uncheck();
  expect(await cricketChecbox.isChecked()).toBeFalsy();
  expect(await moviesCheckbox.isChecked()).toBeTruthy();
  expect(await hockeyCheckbox.isChecked()).toBeTruthy();

  await page.close();
});
