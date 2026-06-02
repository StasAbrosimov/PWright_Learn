import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await test.step("Navigate to github sign in", async () => {
    await page.goto('https://github.com/');
    await page.getByRole('link', { name: 'Sign in' }).click();
  });

  await test.step("Fill up the sign in form", async () => {
    await page.getByRole('textbox', { name: 'Username or email address' }).click();
    await page.getByRole('textbox', { name: 'Username or email address' }).fill('testone');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('testonepass');
  });

  await test.step("Sing in execute", async () => {
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  });


  await test.step("Expect alert is displayed", async () => {
    await expect(page.getByRole('alert').first()).toBeVisible();
  });
});


test('test target=\"_blank\"', async ({ page }) => {

  const pageDocs = await test.step("Open Documentation page on github", async () => {
    await page.goto('https://github.com/');
    await page.getByRole('button', { name: 'Platform' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Documentation' }).click();
    return await page1Promise;
  })

  await test.step("Go to page 11 in Get started", async () => {
    await pageDocs.getByRole('listitem').filter({ hasText: 'Get started' }).click();
    await pageDocs.getByRole('link', { name: 'Get started' }).click();
    await pageDocs.getByRole('link', { name: 'Page 11' }).click();
  });


  await test.step("Open \"Explore adn contribute\" article", async () => {
    await pageDocs.getByRole('link', { name: 'Explore and contribute Uploading a project to GitHub Learn how to upload the' }).click();
  });

  await expect(pageDocs.locator('#title-h1')).toContainText('Uploading a project to GitHub');
});