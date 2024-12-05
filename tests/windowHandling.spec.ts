import { test, expect } from "@playwright/test";

test("Single Tab Handling", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Windows.html");
  // Action should be second argument so the orden should be listener first and second
  // the action.
  const [newTab] = await Promise.all([
    page.waitForEvent("popup"),
    await page.click('button:has-text("click")'),
  ]);

  await newTab.waitForLoadState();
  await expect(newTab.locator(".h3.mb-3.selenium-webdriver")).toHaveText(
    "Selenium WebDriver"
  );
  await newTab.locator('//a[contains(@class, "selenium-webdriver")]').click();
  await newTab.waitForLoadState();
  await newTab.locator('span:has-text("Search")').nth(0).click();
  const docSearchInput = newTab.locator("#docsearch-input");
  await docSearchInput.click();
  await docSearchInput.fill("Locator Strategies");
  const hitContainer = newTab.locator(".DocSearch-Hit-Container");
  await hitContainer.first().waitFor({
    state: "visible",
    timeout: 10000,
  });
  expect(await hitContainer.count()).toEqual(5);
  // After closing the page playwright will
  // return the control to the previous page.
  await newTab.close();
  await page.close();
});

test("Single Window Handling", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Windows.html");
  await page.locator('.analystic[href="#Seperate"]').click();
  const [newWindow] = await Promise.all([
    page.waitForEvent("popup"),
    await page.click('button[onclick="newwindow()"]'),
  ]);
  await newWindow.waitForLoadState();
  await expect(newWindow.locator(".h3.mb-3.selenium-webdriver")).toHaveText(
    "Selenium WebDriver"
  );
  await newWindow
    .locator('//a[contains(@class, "selenium-webdriver")]')
    .click();
  await newWindow.waitForLoadState();
  await newWindow.locator('span:has-text("Search")').nth(0).click();
  const docSearchInput = newWindow.locator("#docsearch-input");
  await docSearchInput.click();
  await docSearchInput.fill("Locator Strategies");
  const hitContainer = newWindow.locator(".DocSearch-Hit-Container");
  await hitContainer.first().waitFor({
    state: "visible",
    timeout: 10000,
  });
  expect(await hitContainer.count()).toEqual(5);
  await newWindow.close();
  await page.close();
});

test("Multiple Tab Handling", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/Windows.html");
  await page.locator(".analystic[href='#Multiple']").click();

  const [multipleTab] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("button[onclick='multiwindow()']"),
  ]);

  await multipleTab.waitForLoadState();
  const pages = multipleTab.context().pages();
  console.log("Total pages opened: ", pages.length);

  const emailPage = pages.find((p) => p.url().includes("/Index.html"));

  const seleniumPage = pages.find((p) => p.url().includes("selenium.dev"));
  if (seleniumPage) {
    await seleniumPage.waitForLoadState();
    await seleniumPage
      .locator('//a[contains(@class, "selenium-webdriver")]')
      .click();
    await seleniumPage.waitForLoadState();
    await seleniumPage.locator('span:has-text("Search")').nth(0).click();
    const docSearchInput = seleniumPage.locator("#docsearch-input");
    await docSearchInput.click();
    await docSearchInput.fill("Locator Strategies");
    const hitContainer = seleniumPage.locator(".DocSearch-Hit-Container");
    await hitContainer.first().waitFor({ state: "visible", timeout: 10000 });
    expect(await hitContainer.count()).toEqual(5);
  }
  await seleniumPage?.close();

  if (emailPage) {
    await emailPage.locator("#email").waitFor({ state: "visible" });
    await emailPage.locator("#email").fill("Playwright@gmail.com");
  } else {
    throw new Error("Email page not found");
  }
  await emailPage?.close();
  await page.close();
});

test("Multiple Window Handles", async ({ page }) => {
  await page.goto(
    "https://www.hyrtutorials.com/p/window-handles-practice.html"
  );

  const [multipleWindow] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("#newWindowsBtn"),
  ]);

  await multipleWindow.waitForLoadState();
  const pages = multipleWindow.context().pages();
  console.log("Total pages opened: ", pages.length);

  const basicControlsPage = pages.find((p) =>
    p.url().includes("p/basic-controls.html")
  );
  const xpathPracticePage = pages.find((p) =>
    p.url().includes("/p/add-padding-to-containers.html")
  );
  if (basicControlsPage) {
    await basicControlsPage.waitForLoadState();
    expect(
      await basicControlsPage.locator(".post-title.entry-title").innerText()
    ).toBe("Basic Controls");
  }
  if (xpathPracticePage) {
    await xpathPracticePage.waitForLoadState();
    expect(
      await xpathPracticePage.locator(".post-title.entry-title").innerText()
    ).toBe("XPath Practice");
  }
  await basicControlsPage?.close();
  await page.close();
});
