import { test, expect } from "@playwright/test";

test("My first test", async ({ page, context }) => {
  // Before execution to strat the tracing
  await context.tracing.start({ snapshots: true, screenshots: true });

  await page.goto("https://www.google.com/");
  await expect(page).toHaveTitle("Google1");

  // we need to stop the trace.
  await context.tracing.stop({
    path: "traceTest.zip",
  });
});
