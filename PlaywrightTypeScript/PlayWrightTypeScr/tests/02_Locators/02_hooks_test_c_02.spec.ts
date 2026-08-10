import { test, expect } from '@playwright/test'


test.beforeAll(async () => {
    console.log('before all');
});

test.beforeEach(async ({ page }) => {
    console.log('before each');
    await page.goto('https://demo.playwright.dev/todomvc/#/');
})

test.afterEach(async () => {
    console.log('after each')
});

test.afterAll(async () => {
    console.log('after all')
});

test('test one H', async ({ page }) => {
    console.log('test one');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/TodoMVC/);
});

test('test second H', async ({ page }) => {
    console.log('test second');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/TodoMVC/);
});