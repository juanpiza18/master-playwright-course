import { test, expect } from "@playwright/test";

test("Frame handiling using Page.Frame()", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  // To Find our total number of frames
  const allFrames = page.frames();
  const allFramesCount = allFrames.length;
  console.log("Total Frames Count Is: ", allFramesCount);
  const frame1 = page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_1.html",
  });
  await frame1?.locator('input[name="mytext1"]').fill("Playwright");

  await page.waitForTimeout(5000);
  await page.close();
});

test("Frame handiling using Page.FrameLocator()", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  const frame1 = page.frameLocator('frame[src="frame_1.html"]');
  await frame1?.locator('input[name="mytext1"]').fill("Playwright");
  await page.waitForTimeout(5000);
  await page.close();
});

test.skip("Nested Frame Handing", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  const frame3 = page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_3.html",
  });
  const childFrames = frame3?.childFrames();
  console.log("Number of child frames ", childFrames?.length);
  if (childFrames && childFrames.length > 0) {
    await childFrames[0].locator('//*[@id="i9"]').check({ force: true });
    await childFrames[0].locator('//*[@id="i21"]').check({ force: true });
  }
  await page.waitForTimeout(5000);
  await page.close();
});
