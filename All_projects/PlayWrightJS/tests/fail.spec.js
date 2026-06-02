import { test, expect, selectors } from '@playwright/test';

test.use({ locale: 'en-GB' });

test.describe("failTest", () => {

    test.afterAll(async () => {
        selectors.setTestIdAttribute("data-testid");
        console.log("afterAll");
    });

    test("Env", async ({ page }) => {
        selectors.setTestIdAttribute("autocomplete");

        await page.goto(process.env.TEST_URL);
        //await page.goto('https://github.com/login');
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