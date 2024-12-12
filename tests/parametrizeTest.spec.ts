import { test, expect } from "@playwright/test";

type User = {
  username: string;
  password: string;
};

const users: User[] = [
  {
    username: "Admin",
    password: "admin123",
  },
  {
    username: "admin_invalid",
    password: "invalid123",
  },
];

users.forEach((user: User) => {
  test(`Login Test with credentials ${user.username} Parametrization `, async ({
    page,
  }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.locator('[name="username"]').fill(user.username);
    await page.locator('[name="password"]').fill(user.password);
    await page.locator('[type="submit"]').click();
    await page.locator(".oxd-userdropdown-tab").click();
    await page.locator('//a[contains(@href, "logout")]').click();
    await page.close();
  });
});
