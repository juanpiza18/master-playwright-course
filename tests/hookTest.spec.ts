import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
});

test.afterEach(async ({}) => {
  await page.locator("#react-burger-menu-btn").click();
  await page.locator("#logout_sidebar_link").click();
  await expect(page.locator(".login_logo")).toHaveText("Swag Labs");
  await page.close();
});

test("Add items and Checkout test", async ({}) => {
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  await page.locator(".shopping_cart_link").click();
  const items = await page.locator(".cart_item").elementHandles();
  expect(items.length).toBe(1);
  await page.locator("#checkout").click();
  await expect(page.locator(".title")).toHaveText("Checkout: Your Information");
});

test("Add items and remove from Cart test", async ({}) => {
  await page.locator("#add-to-cart-sauce-labs-backpack").click();
  await page.locator(".shopping_cart_link").click();
  const cartItems = page.locator(".cart_item").elementHandles();
  expect((await cartItems).length).toBe(1);
  await page.locator("#remove-sauce-labs-backpack").click();
});
/*
Running 3 tests using 1 worker
[chromium] › hookTest.spec.ts:11:5 › Test 1
Before All
Before Each
Test 1 block
After Each
[chromium] › hookTest.spec.ts:15:5 › Test 2
Before Each
Test 2 block
After Each
[chromium] › hookTest.spec.ts:19:5 › Test 3
Before Each
Test 1 block
After Each
After All

test.beforeAll(async () => {
  console.log("Before All");
});

test.beforeEach(async () => {
  console.log("Before Each");
});

test("Test 1", async ({ page }) => {
  console.log("Test 1 block");
});

test("Test 2", async ({ page }) => {
  console.log("Test 2 block");
});

test("Test 3", async ({ page }) => {
  console.log("Test 1 block");
});

test.afterAll(async () => {
  console.log("After All");
});

test.afterEach(async () => {
  console.log("After Each");
});*/
