import { test, expect } from '@playwright/test';

test('login with provided credentials', async ({ page }) => {
  const username = process.env.SAUCE_USERNAME;
  const password = process.env.SAUCE_PASSWORD;

  if (!username || !password) {
    throw new Error('Please set SAUCE_USERNAME and SAUCE_PASSWORD environment variables (or copy .env.example to .env)');
  }

  await page.goto('/');

  const userInput = page.locator('[data-test="username"]');
  const passInput = page.locator('[data-test="password"]');

  await userInput.click();
  await userInput.fill(username);

  await passInput.click();
  await passInput.fill(password);

  const loginButton = page.locator('[data-test="login-button"]');
  await loginButton.click();

  await expect(page).toHaveURL(/.*inventory.html/);
});
