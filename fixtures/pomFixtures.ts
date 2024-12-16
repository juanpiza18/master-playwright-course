import { test as baseTest } from "@playwright/test";
import {
  LandingPage,
  SignInPage,
  HomePage,
  SettingsPage,
} from "../tests/pages";

type Pages = {
  landingPage: LandingPage;
  signInPage: SignInPage;
  homePage: HomePage;
  settingsPage: SettingsPage;
};

const testPages = baseTest.extend<Pages>({
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
});

export const test = testPages;
export const expect = testPages.expect;
