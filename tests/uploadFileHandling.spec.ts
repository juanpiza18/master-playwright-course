import { test, expect } from "@playwright/test";

test("Upload Multiple files - Approach 1", async ({ page }) => {
  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
  const uploadFile = await Promise.all([
    page.waitForEvent("filechooser"),
    page.locator('input[name="files[]"]').click(),
  ]);

  await uploadFile[0].setFiles([
    "filesToUpload/GenRocketCourseCatalog.png",
    "filesToUpload/GenRocketCourseInformationAndEnrollButton.png",
  ]);

  await page.waitForTimeout(5000);

  await page.close();
});

test("Upload Multiple files - Approach 2", async ({ page }) => {
  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
  await page.setInputFiles('input[name="files[]"]', [
    "filesToUpload/GenRocketCourseCatalog.png",
    "filesToUpload/GenRocketCourseInformationAndEnrollButton.png",
  ]);
  await page.waitForTimeout(5000);
  await page.close();
});
