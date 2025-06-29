import { test, expect } from '@playwright/test';
let chalk: any;

test.beforeAll(async () => {
  chalk = await import('chalk');
  console.log(chalk.default.cyan.bold('\n🔎 Running Media-size Tests...\n'));
});


test('All <img> elements should have width and height attributes', async ({ page }) => {
  await page.goto('https://www.orchestry.com/');
  const imgs = await page.$$('img');

  for (const img of imgs) {
    const width = await img.getAttribute('width');
    const height = await img.getAttribute('height');

    if (!width || !height) {
      const outer = await img.evaluate(el => el.outerHTML);
      console.error('🖼️ Missing width/height on:\n', outer);
    }

    expect(width).not.toBeNull();
    expect(height).not.toBeNull();
  }
});

test('No individual asset should be too large', async ({ page, context }) => {
  let largeAssets: { url: string; size: number }[] = [];

  page.on('response', async (res) => {
    const size = Number(res.headers()['content-length'] || 0);
    if (size > 300 * 1024) { // 300KB+
      largeAssets.push({ url: res.url(), size });
    }
  });

  await page.goto('https://www.orchestry.com/', { waitUntil: 'networkidle' });

  if (largeAssets.length > 0) {
    console.log('📦 Large Assets Detected:');
    largeAssets.forEach(asset => {
      console.log(`- ${asset.url} | ${Math.round(asset.size / 1024)} KB`);
    });
  }

  expect(largeAssets.length).toBeLessThan(5); // Set your threshold
});