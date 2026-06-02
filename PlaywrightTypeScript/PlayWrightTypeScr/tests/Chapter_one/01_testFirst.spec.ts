import { test, expect } from '@playwright/test';

test("Goggle search", async ({ page }) => {
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

});