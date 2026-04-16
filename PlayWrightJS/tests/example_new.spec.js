import { test, expect, selectors } from '@playwright/test';

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

test('Community link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: '.NET' }).first().click();
  await page.getByRole('link', { name: 'Community' }).click();

  await expect(page.getByRole('heading', { name: 'Community DiscordDirect link' })).toBeVisible();
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

test("Locator by locator", async ({ page }) => {
  await page.goto("https://github.com/login");
  var userNameLocator = page.locator("#login_field");
  var passwordLocator = page.locator("#password");
  await userNameLocator.click();
  await userNameLocator.fill("UserName");
  await passwordLocator.click();
  await passwordLocator.fill("pswdtest1w@WW");
  await page.locator(".js-sign-in-button").click();
  await page.waitForTimeout(2000);
  await expect(page.locator('.js-flash-alert')).toBeVisible();
});

test.describe("Test Id redefine", () => {

  test.afterAll(async () => {
    selectors.setTestIdAttribute("data-testid");
    console.log("afterAll");
  });

  test("Locator by test id", async ({ page }) => {
    selectors.setTestIdAttribute("autocomplete");

    await page.goto("https://github.com/login");
    var userNameLocator = page.getByTestId("username");
    var passwordLocator = page.getByTestId("current-password");

    await userNameLocator.fill("UserName");
    await passwordLocator.fill("pswdtest1w@WW");

    selectors.setTestIdAttribute("name");
    await page.getByTestId("commit").click();
    await page.waitForTimeout(250);

    selectors.setTestIdAttribute("class");
    await expect(page.getByTestId('js-flash-alert')).toBeVisible();
  });
});



