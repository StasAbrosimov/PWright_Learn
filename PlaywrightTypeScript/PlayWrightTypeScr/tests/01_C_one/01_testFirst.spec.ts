import { test, expect } from '@playwright/test';

test("playwright search", async ({ page }) => {
    await page.goto('https://playwright.dev');

    await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();

    const searchInput = page.getByRole('searchbox', { name: 'Search' });

    await searchInput.click()
    await page.waitForTimeout(250);
    await searchInput.fill("page");
    await page.waitForTimeout(250);
    await searchInput.click()
    await page.waitForTimeout(250);
    await searchInput.press("Enter");

    await page.getByRole('link', { name: 'BrowserContext' }).click();
    await page.waitForTimeout(250);

    expect(page.getByRole('heading', { name: 'BrowserContext' })).toBeVisible();
    expect(page).toHaveTitle("BrowserContext | Playwright");
});


test("playwright search record to cursor", async ({ page }) => {
    await page.goto('https://playwright.dev');

    await page.getByRole('button', { name: 'Search (Ctrl+K)' }).click();

    const searchInput = page.getByRole('searchbox', { name: 'Search' });

    await searchInput.click()
    await page.waitForTimeout(250);
    await searchInput.fill("page");
    await page.waitForTimeout(250);
    await searchInput.click()
    await page.waitForTimeout(250);
    await searchInput.press("Enter");

    await page.getByRole('link', { name: 'BrowserContext' }).click();
    await page.waitForTimeout(250);

    await expect(page.getByRole('heading', { name: 'BrowserContext' })).toBeVisible();
    await expect(page).toHaveTitle("BrowserContext | Playwright");
    await expect(page.getByRole('article')).toContainText('Removes cookies from context. Accepts optional filter.');
});