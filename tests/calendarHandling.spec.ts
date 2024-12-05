import { expect, Page, test } from "@playwright/test";
import { DateTime } from "luxon";

test("Using fill method", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo"
  );
  // const date = "18-Oct-1993"; we need to check the JS format of the page so in this case is like this
  // yyyy-MM-dd
  const date = "1993-10-18";
  const dateInput = page.locator("#birthday");
  await dateInput.fill(date);
  await page.close();
});

test("Using Luxon", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo"
  );
  await page.locator("input[placeholder='Start date']").click();
  selectDate(page, 18, "October 2022");
  await page.reload();

  await page.locator("input[placeholder='Start date']").click();
  selectDate(page, 20, "January 2025");

  await page.close();
});

async function selectDate(page: Page, day: number, dateToSelect: string) {
  const monthYear = page.locator(
    "div[class='datepicker-days'] th[class='datepicker-switch']"
  );
  const nextButton = page.locator(
    "div[class='datepicker-days'] th[class='next']"
  );
  const prevButton = page.locator(
    "div[class='datepicker-days'] th[class='prev']"
  );

  const formattedMonth = DateTime.fromFormat(dateToSelect, "MMMM yyyy");
  while ((await monthYear.textContent()) != dateToSelect) {
    if (formattedMonth < DateTime.fromJSDate(new Date())) {
      await prevButton.click();
    } else {
      await nextButton.click();
    }
  }
  await page.locator(`//td[@class='day'][text()='${day}']`).click();
}
