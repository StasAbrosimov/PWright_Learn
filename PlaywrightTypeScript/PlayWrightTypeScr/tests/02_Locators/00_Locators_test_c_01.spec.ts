import { test, expect, Page } from '@playwright/test';

test("locators get by role", async ({ page }) => {
    await page.goto('https://github.com/StasAbrosimov/');

    //link
    await page.getByRole('link', { name: 'Sign In' }).click()

    await page.goBack();

    //label
    await page.getByLabel('Homepage', { exact: true }).click();

    await expect(page.url()).toEqual('https://github.com/');

    await page.goBack();

    //Alt text
    //More than one element add filter to click on visible
    await page.getByAltText('Achievement: Arctic Code Vault Contributor', { exact: true }).filter({ visible: true }).click();

    await expect(page.url()).toContain('achievement=arctic-code-vault-contributor');

    await page.goBack();

    await page.getByAltText("View StasAbrosimov's full-sized avatar", { exact: true }).click();

    await expect(page.url()).toContain("https://avatars.githubusercontent.com/u/13332157");

    await page.goBack();

    await expect(page.url()).toContain("https://github.com/StasAbrosimov/");
});

//getByTestId and testIdAttribute local override
test.describe("Local redefining of 'testIdAtribute'", () => {

    test.use({ testIdAttribute: 'data-tab-item' })

    const openTabFunc = async (fPage: Page, tabName: string): Promise<Page> => {
        //need to wait for navigation and then URL will contains needed part
        const loadPromise = fPage.waitForEvent('framenavigated');

        await fPage.getByTestId(tabName).filter({ visible: true }).click();

        const result = await loadPromise;

        return fPage;
    };

    test('profile tab navigation check', async ({ page }) => {
        await page.goto('https://github.com/StasAbrosimov/');

        page = await openTabFunc(page, 'repositories');
        await expect(page.url()).toContain("repositories");

        page = await openTabFunc(page, 'projects');
        await expect(page.url()).toContain("projects");

        page = await openTabFunc(page, 'packages');
        await expect(page.url()).toContain("packages");

        page = await openTabFunc(page, 'stars');
        await expect(page.url()).toContain("stars");

        page = await openTabFunc(page, 'overview');
        await expect(page.url()).toEqual("https://github.com/StasAbrosimov");

    });

});