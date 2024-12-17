import { test, expect } from "@playwright/test";
import { LandingPage, SignInPage, HomePage, SettingsPage } from "./pages";

test("Login Conduit Test using POM", async ({ page }) => {
  await page.goto("https://react-redux.realworld.io/");
  const landingPage: LandingPage = new LandingPage(page);
  const signInPage: SignInPage = new SignInPage(page);
  const homePage: HomePage = new HomePage(page);
  const settingsPage: SettingsPage = new SettingsPage(page);
  await landingPage.clickSignInButton();
  await signInPage.signInWithEmailAndPassword(
    "playwrightdemo@gmail.com",
    "playwrightdemo"
  );
  await homePage.clickSettingsButton();
  await settingsPage.clickLogoutButton();
  await page.close();
});
