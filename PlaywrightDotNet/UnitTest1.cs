using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
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
        public override BrowserNewContextOptions ContextOptions()
        {
            var context = base.ContextOptions();
            context.Locale = "en-GB";
            context.TimezoneId = "Europe/London";
            return context;
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
    }
}