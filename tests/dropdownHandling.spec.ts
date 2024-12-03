import { test, expect } from "@playwright/test";

test("Single static dropdown", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Register.html");
  await page.selectOption("#Skills", {
    value: "Analytics",
  });

  await page.selectOption("#Skills", {
    label: "Adobe Photoshop",
  });

  await page.selectOption("#Skills", {
    index: 5,
  });

  await expect(page.locator("#Skills")).toHaveValue("APIs");

  await page.close();
});

test("Multi static dropdown", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/select-dropdown-demo"
  );
  await page.selectOption("#multi-select", [
    {
      value: "Ohio",
    },
    {
      label: "Texas",
    },
    {
      index: 3,
    },
  ]);

  await page.close();
});

test("Searchable Dynamic dropdown", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Register.html");
  // Expand the dropdown
  await page.locator('span[role="combobox"]').click();
  // Text Box
  await page.locator('input[role="textbox"]').fill("Australia");
  // Select result first element
  await page.locator("#select2-country-results > li").nth(0).click();

  await expect(page.locator("#select2-country-container")).toHaveText(
    "Australia"
  );
  await page.close();
});

test("Non Searchable Dynamic dropdown", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Register.html");
  // Expand the dropdown
  await page.locator('span[role="combobox"]').click();
  // Select result first element
  //const options = await page.locator("#select2-country-results > li").elementHandles();;
  // Select result first element
  await page
    .locator("ul#select2-country-results")
    .locator("li", {
      hasText: "Australia",
    })
    .click();

  await expect(page.locator("#select2-country-container")).toHaveText(
    "Australia"
  );
  await page.close();
});
