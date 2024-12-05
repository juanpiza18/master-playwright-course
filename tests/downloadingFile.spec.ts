import { test, expect } from "@playwright/test";

test("Download File", async ({ page }) => {
  await page.goto("https://demo.automationtesting.in/FileDownload.html");
  const textBox = page.locator("#textbox");
  await textBox.click();
  const generateFileButton = page.locator("#createTxt");
  await expect(generateFileButton).toBeDisabled();
  await textBox.pressSequentially("Playwright");
  const linkToDownload = page.locator("#link-to-download");
  await expect(linkToDownload).not.toBeVisible();
  await expect(generateFileButton).not.toBeDisabled();
  await generateFileButton.click();
  await expect(linkToDownload).toBeVisible();

  const download = await Promise.all([
    page.waitForEvent("download"),
    linkToDownload.click(),
  ]);

  const path = await download[0].path();
  console.log("Downloaded Path ", path);

  // Way-1 using the default file name.
  /*const fileName = download[0].suggestedFilename();
  await download[0].saveAs(fileName);*/

  // Way-2 customazing the file name.
  const customFileName = "Playwright_downloaded_file.txt";
  await download[0].saveAs(customFileName);
  await page.close();
});
