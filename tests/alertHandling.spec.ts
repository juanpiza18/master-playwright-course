import { test, expect } from "@playwright/test";

test("Simple Alert Handling", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  await page.locator('button[onclick="jsAlert()"]').click();

  await expect(page.locator("#result")).toHaveText(
    "You successfully clicked an alert"
  );
  await page.close();
});

test("Simple Alert Handling Listener", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  page.on("dialog", async (alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual("I am a JS Alert");
    await alert.accept();
    await expect(page.locator("#result")).toHaveText(
      "You successfully clicked an alert"
    );
  });
  // Action should be after the event listener
  await page.locator('button[onclick="jsAlert()"]').click();
  await page.close();
});

test("Confirm Alert - Accept - Handling", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  page.on("dialog", async (alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual("I am a JS Confirm");
    await alert.accept();
    await expect(page.locator("#result")).toHaveText("You clicked: Ok");
  });
  // Action should be after the event listener
  await page.locator('button[onclick="jsConfirm()"]').click();
  await page.close();
});

test("Confirm Alert - Cancel - Handling", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  page.on("dialog", async (alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual("I am a JS Confirm");
    await alert.dismiss();
    await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
  });
  // Action should be after the event listener
  await page.locator('button[onclick="jsConfirm()"]').click();
  await page.close();
});

test("Js Prompt Alert - Ok Button - Handling", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  page.on("dialog", async (alert) => {
    const textValue = "Playwright";
    const alertMessage = alert.message();
    expect(alertMessage).toEqual("I am a JS prompt");
    await alert.accept(textValue);
    await expect(page.locator("#result")).toHaveText(
      `You entered: ${textValue}`
    );
  });
  // Action should be after the event listener
  await page.locator('button[onclick="jsPrompt()"]').click();
  await page.close();
});

test("Js Prompt Alert - Cancel Button - Handling", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  page.on("dialog", async (alert) => {
    const alertMessage = alert.message();
    expect(alertMessage).toEqual("I am a JS prompt");

    await alert.dismiss();
    await expect(page.locator("#result")).toHaveText(`You entered: null`);
  });
  // Action should be after the event listener
  await page.locator('button[onclick="jsPrompt()"]').click();
  await page.close();
});
