import { test, expect } from '@playwright/test';
let chalk: any;

test.beforeAll(async () => {
  chalk = await import('chalk');
  console.log(chalk.default.cyan.bold('\n🔎 Running Dom-health Tests...\n'));
});



test('Page should not have excessive DOM size', async ({ page }) => {
  await page.goto('https://www.orchestry.com/');
  const domCount = await page.evaluate(() => document.querySelectorAll('*').length);

  console.log(`🌐 DOM Element Count: ${domCount}`);
  expect(domCount).toBeLessThan(1200); // Safe upper limit
});

test('Page should not have excessive CSS rules', async ({ page }) => {
  await page.goto('https://www.orchestry.com/');
  const cssRulesCount = await page.evaluate(() => {
    return Array.from(document.styleSheets)
      .reduce((count, sheet) => {
        try {
          return count + sheet.cssRules.length;
        } catch (e) {
          return count; // Ignore cross-origin stylesheets
        }
      }, 0);
  });

  console.log(`📏 CSS Rules Count: ${cssRulesCount}`);
  expect(cssRulesCount).toBeLessThan(5000); // Set your threshold
});

test('Page should not have excessive inline styles', async ({ page }) => {
  await page.goto('https://www.orchestry.com/');
  const inlineStylesCount = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*'))
      .reduce((count, el) => count + (el.getAttribute('style') ? 1 : 0), 0);
  });

  console.log(`📐 Inline Styles Count: ${inlineStylesCount}`);
  expect(inlineStylesCount).toBeLessThan(100); // Set your threshold
});