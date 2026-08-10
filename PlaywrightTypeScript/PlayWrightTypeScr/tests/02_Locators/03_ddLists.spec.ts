import { test, expect } from '@playwright/test'



test('the-internet.herokuapp DDList by id', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    // Expect a title "to contain" a substring.

    var ddList = page.locator('#dropdown');
    await ddList.selectOption('1');

    await page.waitForTimeout(500);

});


test('the-internet.herokuapp DDList by text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    // Expect a title "to contain" a substring.

    var ddList = page.locator('#dropdown');

    await ddList.selectOption("Option 2");
    await page.waitForTimeout(500);
});


test('the-internet.herokuapp DDList test options', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    // Expect a title "to contain" a substring.

    var ddList = page.locator('#dropdown');
    await ddList.focus()

    await page.waitForTimeout(500);

    await expect(page.locator('#dropdown>option')).toHaveText(['Please select an option', 'Option 1', 'Option 2'])

});