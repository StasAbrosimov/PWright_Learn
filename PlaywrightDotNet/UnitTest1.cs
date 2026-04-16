using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using dotenv.net;
using dotenv.net.Utilities;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using Microsoft.VisualBasic;
using NUnit.Framework;
using NUnit.Framework.Internal;

namespace PlaywrightTests
{
    [Parallelizable(ParallelScope.Self)]
    [TestFixture]
    public class ExampleTest : PageTest
    {
        private IDictionary<string, string> envVars = DotEnv.Read();
        public override BrowserNewContextOptions ContextOptions()
        {
            var context = base.ContextOptions();
            context.Locale = "en-GB";
            context.TimezoneId = "Europe/London";
            return context;
        }

        [OneTimeSetUp]
        public void OnSetUp()
        {
            DotEnv.Load();
            envVars = DotEnv.Read();
        }

        [TearDown]
        public void AfterEach()
        {
            Playwright.Selectors.SetTestIdAttribute("data-testid");
        }

        [Test]
        public async Task HasTitle()
        {
            await Page.GotoAsync("https://playwright.dev");

            // Expect a title "to contain" a substring.
            await Expect(Page).ToHaveTitleAsync(new Regex("Playwright"));
        }

        [Test]
        public async Task GetStartedLink()
        {
            await Page.GotoAsync("https://playwright.dev");

            // Click the get started link.
            await Page.GetByRole(AriaRole.Link, new() { Name = "Get started" }).ClickAsync();

            // Expects page to have a heading with the name of Installation.
            await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Installation" })).ToBeVisibleAsync();
        }

        [Test]
        public async Task CommunityLink()
        {
            await Page.GotoAsync("https://playwright.dev");

            // Click the get started link.
            await Page.GetByRole(AriaRole.Link, new() { Name = "Community" }).ClickAsync();

            // Expects page to have a heading with the name of Installation.
            await Expect(Page.GetByRole(AriaRole.Heading, new() { Name = "Welcome" })).ToBeVisibleAsync();
        }

        [Test] //CancelAfter(15000)]
        public async Task Community_BugReportsLink()
        {
            var newPage = await Context.RunAndWaitForPageAsync(async () =>
            {
                await Page.GotoAsync("https://playwright.dev");
                // Click the get started link.
                await Page.GetByRole(AriaRole.Link, new() { Name = "Community" }).ClickAsync();

                // Click the get started link.
                await Page.GetByRole(AriaRole.Link, new() { Name = "Bug Reports" }).ClickAsync();
            });

            // Expects page to have a heading with the name of Installation.
            await Expect(newPage).ToHaveURLAsync(new Regex("github.com"));
        }

        [Test]
        public async Task Locator_Label()
        {
            await Page.GotoAsync("https://www.google.com");
            await Page.WaitForTimeoutAsync(1000);
            await Page.GetByLabel("Search", new() { Exact = true }).FillAsync("Some Search text");
            await Page.GetByLabel("Search", new() { Exact = true }).PressAsync("Enter");
            await Page.WaitForTimeoutAsync(2000);
            Console.WriteLine(Page.Url);
        }

        [Test]
        public async Task Locator_Alt_Full()
        {
            await Page.GotoAsync("https://github.com/StasAbrosimov");
            await Page.WaitForTimeoutAsync(1000);

            await Page.GetByAltText("Achievement: Pull Shark", new() { Exact = true }).Filter(new() { Visible = true }).ClickAsync();
            await Expect(Page).ToHaveURLAsync(new Regex("achievement=pull-shark&tab=achievements"), new() { IgnoreCase = true });
        }

        [Test]
        public async Task EnvUsage()
        {

            await Page.GotoAsync(envVars["TEST_URL"]);

            Playwright.Selectors.SetTestIdAttribute("autocomplete");
            var userNameLocator = Page.GetByTestId("username");
            var passwordLocator = Page.GetByTestId("current-password");

            await userNameLocator.FillAsync(envVars["SomeUserName"]);
            await passwordLocator.FillAsync(envVars["SomeUserPWD"]);

            Playwright.Selectors.SetTestIdAttribute("name");
            await Page.GetByTestId("commit").ClickAsync();
            await Page.WaitForTimeoutAsync(250);

            Playwright.Selectors.SetTestIdAttribute("class");
            await Expect(Page.GetByTestId("js-flash-alert")).ToBeVisibleAsync();

            Playwright.Selectors.SetTestIdAttribute("autocomplete");

            await Expect(Page.GetByTestId("current-password")).ToBeEmptyAsync();
            await Expect(Page.GetByTestId("username")).ToHaveValueAsync(envVars["SomeUserName"]);
        }

    }
}