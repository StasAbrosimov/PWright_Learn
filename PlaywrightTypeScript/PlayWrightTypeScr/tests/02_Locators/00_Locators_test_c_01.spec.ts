import { test, expect, Page, Locator } from '@playwright/test';
import config from './../../playwright.config';


const startingUrl = 'https://github.com/StasAbrosimov';


const openGitHubAFunc = async (fPage: Page): Promise<Page> => {
    await fPage.goto(startingUrl);
    return fPage;
};

test("locators get by role", async ({ page }) => {
    page = await openGitHubAFunc(page);

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

    const tabNavigationCheckFunc = async (fPage: Page, tabName: string, urlContainPart?: string | undefined | null) => {
        if (!urlContainPart) {
            urlContainPart = tabName;
        }

        fPage = await openTabFunc(fPage, tabName);
        await expect(fPage.url()).toContain(urlContainPart);

        return fPage;
    }

    test('repositories tab navigation check', async ({ page }) => {

        page = await openGitHubAFunc(page);

        page = await tabNavigationCheckFunc(page, 'repositories');
    });

    test('projects tab navigation check', async ({ page }) => {
        page = await openGitHubAFunc(page);

        page = await tabNavigationCheckFunc(page, 'projects');
    });

    test('packages tab navigation check', async ({ page }) => {
        page = await openGitHubAFunc(page);

        page = await tabNavigationCheckFunc(page, 'packages');
    });

    test('stars tab navigation check', async ({ page }) => {

        page = await openGitHubAFunc(page);

        page = await tabNavigationCheckFunc(page, 'stars');
    });

    test('overview tab navigation check', async ({ page }) => {

        page = await openGitHubAFunc(page);
        page = await tabNavigationCheckFunc(page, 'stars');


        page = await openTabFunc(page, 'overview');
        await expect(page.url()).toEqual(startingUrl);

    });

});

test('GetByText sign up', async ({ page }) => {
    page = await openGitHubAFunc(page);

    await page.getByText("Sign up").click()

    await expect(page.url()).toContain('signup?')
});


const openYoutubePWFunc = async (fPage: Page): Promise<Page> => {
    await fPage.goto('https://www.youtube.com/@Playwrightdev');
    return fPage;
};

const searchInInputInLocatorF = async (locator: Locator, searchText: string): Promise<void> => {
    await locator.click();
    await locator.fill(searchText);
    await locator.press("Enter");
};


test('Placeholder on youtube', async ({ page }) => {
    page = await openYoutubePWFunc(page);

    const searchLocator = await page.getByPlaceholder('Search', { exact: true });
    const searchText = 'Me at the zoo';

    await searchInInputInLocatorF(searchLocator, searchText)

    const pageTitle = await page.title();
    await expect(pageTitle).toContain(searchText);
});

test('Xpath on youtube search', async ({ page }) => {
    page = await openYoutubePWFunc(page);

    const searchLocator = await page.locator('//input[@name="search_query"]');
    const searchText = 'Me at the zoo';

    await searchInInputInLocatorF(searchLocator, searchText);

    const pageTitle = await page.title();
    await expect(pageTitle).toContain(searchText);
});

test('CSS find on github', async ({ page }) => {
    page = await openGitHubAFunc(page);

    await page.locator('img[alt="Achievement: Arctic Code Vault Contributor"]:visible').click();
    await expect(page.url()).toContain('achievement=arctic-code-vault-contributor');
});

test('Get by title', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/intro');
    await page.getByTitle('Release notes', { exact: true }).click();

    await expect(page.url()).toContain('docs/release-notes');
});
