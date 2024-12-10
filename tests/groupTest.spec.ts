import { test, expect, Page } from "@playwright/test";

test.describe("Suite", () => {
  let page: Page;
  test.beforeAll(async () => {
    console.log("Before All");
  });

  test.beforeEach(async () => {
    console.log("Before Each");
  });

  test("Test 1", async () => {
    console.log("Test 1 block");
  });

  test("Test 2", async () => {
    console.log("Test 2 block");
  });

  test("Test 3", async () => {
    console.log("Test 1 block");
  });

  test.afterAll(async () => {
    console.log("After All");
  });

  test.afterEach(async () => {
    console.log("After Each");
  });
});

test("Test 4", async () => {
  console.log("Test 4 block");
});

test("Test 5", async () => {
  console.log("Test 5 block");
});
