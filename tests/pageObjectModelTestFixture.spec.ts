import { test, expect } from "../fixtures/pomFixtures";

test.only("Login Conduit Test using POM", async ({
  page,
  landingPage,
  homePage,
  settingsPage,
  signInPage,
}) => {
  await page.goto("https://react-redux.realworld.io/");
  // Using fixture we dont need to create the object from the POM class.
  // Because we are handiling everything in the fixture configuration, so we need
  // to update the import to point to the fixture file
  await landingPage.clickSignInButton();
  await signInPage.signInWithEmailAndPassword(
    "playwrightdemo@gmail.com",
    "playwrightdemo"
  );
  await homePage.clickSettingsButton();
  await settingsPage.clickLogoutButton();
  await page.close();
});

test.only("Login Conduit Test using POM 2", async ({
  page,
  landingPage,
  homePage,
  signInPage,
}) => {
  await page.goto("https://react-redux.realworld.io/");
  await landingPage.clickSignInButton();
  await signInPage.signInWithEmailAndPassword(
    "playwrightdemo@gmail.com",
    "playwrightdemo"
  );
  await homePage.clickSettingsButton();
  await page.close();
});
