import { test, expect } from '@playwright/test';
let chalk: any;

test.beforeAll(async () => {
  chalk = await import('chalk');
  console.log(chalk.default.cyan.bold('\n🔎 Running Link Tests...\n'));
});


test('All internal links return 200', async ({ page }) => {
  await page.goto('https://www.orchestry.com/');
  const links = await page.$$eval('a[href]', as =>
    as.map(a => (a as HTMLAnchorElement).href)
  );

  const orchestryLinks = links.filter(url =>
    url.includes('orchestry.com')
  );

  const responses = await Promise.all(
    orchestryLinks.map(url => page.request.get(url).catch(e => e))
  );

  for (let i = 0; i < responses.length; i++) {
    const res = responses[i];
    const url = orchestryLinks[i];
    if ('status' in res && typeof res.status === 'function') {
      const status = res.status();
      if (status >= 400) {
        console.error(
  chalk.red.bold(`❌ [Link Error] ${url} returned status ${status}`)
);

      }
      expect(status).toBeLessThan(400);
    } else {
      console.error(`❌ Failed to fetch ${url}`);
      throw res;
    }
  }
});