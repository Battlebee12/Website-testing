import { test, expect } from "@playwright/test";
let chalk: any;

test.beforeAll(async () => {
  chalk = await import("chalk");
  console.log(chalk.default.cyan.bold("\n🔎 Running Link Tests...\n"));
});

test("All internal links return 200", async ({ page }) => {
  try {
    await page.goto("https://www.orchestry.com/");
    const links = await page.$$eval("a[href]", (as) =>
      as.map((a) => (a as HTMLAnchorElement).href)
    );

    const orchestryLinks = links.filter((url) => url.includes("orchestry.com"));

    const responses = await Promise.all(
      orchestryLinks.map((url) =>
        page.request
          .get(url)
          .catch((e) => ({ error: true, url, message: e.message }))
      )
    );

    for (let i = 0; i < responses.length; i++) {
      const res = responses[i];
      const url = orchestryLinks[i];

      if ((res as any).status && typeof (res as any).status === "function") {
        const status = (res as any).status();
        if (status >= 400) {
          console.error(
            chalk.default.red.bold(
              `❌ [Link Error] ${url} returned status ${status}`
            )
          );
        }
        expect(status).toBeLessThan(400);
      } else if ((res as any).error) {
        console.error(
          chalk.default.red.bold(
            `❌ [Request Failed] ${url} — ${(res as any).message}`
          )
        );
        throw new Error(`Request failed for ${url}`);
      } else {
        console.error(`❌ Unexpected error on ${url}`);
        throw res;
      }
    }
  } catch (err) {
    console.error("🔥 Test crashed:", err);
    throw err;
  }
});
