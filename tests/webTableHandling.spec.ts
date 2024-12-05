import { test, expect, Locator, Page } from "@playwright/test";

test("Handling Webtable", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table = page.locator('table[name="BookTable"]');
  // Total number of rows and columns.
  await table.scrollIntoViewIfNeeded();
  const columns = table.locator("tr th");
  const rows = table.locator("tr");
  expect(await columns.count()).toEqual(4);
  expect(await rows.count()).toEqual(7);
  await page.close();
});

test("Selecting single checkbox in the table", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table = page.locator("#productTable");
  const columns = table.locator("thead tr th");
  const rows = table.locator("tbody tr");
  await table.scrollIntoViewIfNeeded();
  expect(await columns.count()).toEqual(4);
  expect(await rows.count()).toEqual(5);
  const matchedRow = rows.filter({
    has: page.locator("td"),
    hasText: "Tablet",
  });
  const matchedRowCheckbox = matchedRow.locator("input");
  await matchedRowCheckbox.check();
  await expect(matchedRowCheckbox).toBeChecked();
  await page.close();
});

test("Selecting multiple checkbox using funciton", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table = page.locator("#productTable");
  const columns = table.locator("thead tr th");
  const rows = table.locator("tbody tr");
  await table.scrollIntoViewIfNeeded();
  expect(await columns.count()).toEqual(4);
  expect(await rows.count()).toEqual(5);
  const matchedRowCheckbox = await selectProduct(rows, page, "Tablet");
  await expect(matchedRowCheckbox).toBeChecked();

  const matchedRowCheckbox1 = await selectProduct(rows, page, "E-Reader", 4);
  await expect(matchedRowCheckbox1).toBeChecked();
  await page.close();
});

test("Printing all items from Page1 in Pagination Table", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table = page.locator("#productTable");
  // const columns = table.locator("thead tr th");
  const rows = table.locator("tbody tr");
  await table.scrollIntoViewIfNeeded();
  const rowsCount = await rows.count();
  for (let i = 0; i < rowsCount; i++) {
    const row = rows.nth(i);
    const rowData = row.locator("td");
    const rowDataCount = await rowData.count();
    for (let j = 0; j < rowDataCount; j++) {
      const cellData = await rowData.nth(j).textContent();
      console.log(cellData);
    }
  }
  await page.close();
});

test("Printing all items from all the pages in Pagination Table", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const table = page.locator("#productTable");
  // const columns = table.locator("thead tr th");
  const rows = table.locator("tbody tr");
  await table.scrollIntoViewIfNeeded();
  const paginator = page.locator("#pagination a");
  const paginationCount = await paginator.count();
  for (let k = 0; k < paginationCount; k++) {
    if (k > 0) {
      paginator.nth(k).click();
    }
    const rowsCount = await rows.count();
    for (let i = 0; i < rowsCount; i++) {
      const row = rows.nth(i);
      const rowData = row.locator("td");
      const rowDataCount = await rowData.count();
      for (let j = 0; j < rowDataCount; j++) {
        const cellData = await rowData.nth(j).textContent();
        console.log(cellData);
      }
    }
  }
  await page.close();
});

async function selectProduct(
  rows: Locator,
  page: Page,
  productName: string,
  pagination = 0
) {
  const adjustedPagination = pagination - 1;
  if (adjustedPagination >= 4) {
    throw new Error("Pagination exceeds the allowed maximum value of 3.");
  }
  if (adjustedPagination >= 0) {
    await page.locator("#pagination a").nth(adjustedPagination).click();
  }
  const matchedRow = rows.filter({
    has: page.locator("td"),
    hasText: productName,
  });
  const matchedRowCheckbox = matchedRow.locator("input[type='checkbox']");
  await matchedRowCheckbox.check();
  return matchedRowCheckbox;
}
