import { test, expect, selectors } from '@playwright/test';


test.use({ locale: 'en-GB' });

test.describe("failTest", () => {

    test.afterAll(async () => {
        selectors.setTestIdAttribute("data-testid");
        console.log("afterAll");
    });

    test("Env", async ({ page }) => {

        await page.goto(`${process.env.TEST_URL}`);
        //await page.goto('https://github.com/login');

        selectors.setTestIdAttribute("autocomplete");
        var userNameLocator = page.getByTestId("username");
        var passwordLocator = page.getByTestId("current-password");

        await userNameLocator.fill(`${process.env.SomeUserName}`);
        await passwordLocator.fill(`${process.env.SomeUserPWD}`);

        selectors.setTestIdAttribute("name");
        await page.getByTestId("commit").click();
        await page.waitForTimeout(250);

        selectors.setTestIdAttribute("class");
        await expect(page.getByTestId('js-flash-alert')).toBeVisible();

        selectors.setTestIdAttribute("autocomplete");

        await expect(page.getByTestId("current-password").first()).toBeEmpty();
        await expect(page.getByTestId("username").first()).toHaveValue(`${process.env.SomeUserPWD}`);
    });
});