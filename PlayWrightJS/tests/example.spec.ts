import { test, expect } from '@playwright/test';

test.use({ locale: 'en-GB' });

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Stay safe, Stay tested', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.waitForTimeout(250);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Stay safe');
  await page.waitForTimeout(250);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.waitForTimeout(250);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Stay tested');
  await page.waitForTimeout(250);
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.waitForTimeout(250);
  await expect(page.locator('body')).toContainText('Stay safe');
  await expect(page.locator('body')).toContainText('Stay tested');
});

test("Label test", async ({ page }) => {
  await page.goto("https://www.google.com/"); //Search
  await page.waitForTimeout(2000);
  await page.getByLabel("Search", { exact: true }).fill("G4G");
  await page.waitForTimeout(2000);
  await page.getByLabel("Search", { exact: true }).press("Enter");
});

test("Locator alt full text", async ({ page }) => {
  await page.goto("https://github.com/StasAbrosimov");
  await page.getByAltText("Achievement: Pull Shark", { exact: true }).filter({ visible: true }).click();
  await expect(page).toHaveURL(/.*achievement=pull-shark&tab=achievements.*/, { ignoreCase: true });
});