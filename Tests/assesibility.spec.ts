import { test, expect } from '@playwright/test';

let chalk: any;

// Load chalk and log suite title
test.beforeAll(async () => {
  chalk = await import('chalk');
  console.log(chalk.default.cyan.bold('\n🔎 Running Accessibility Tests...\n'));
});

// 1. Accessible Names Test

test('Buttons and links should have accessible names', async ({ page }) => {
 // console.log(chalk.default.blue('\n🔍 Checking accessible names on buttons and links...\n'));
  await page.goto('https://www.orchestry.com/');

  const buttons = await page.$$('[role=button], button, a');
  for (const btn of buttons) {
    const name = await btn.getAttribute('aria-label') || await btn.textContent();
    if (!name || name.trim().length === 0) {
      const outer = await btn.evaluate(el => el.outerHTML);
      console.error(
        chalk.default.red.bold('❌ [Accessibility] Element missing accessible name:\n') +
        chalk.default.gray(outer)
      );
    }
    expect(name?.trim().length).toBeGreaterThan(0);
  }
});

// 2. Image Alt Text Test

test('All images should have non-empty alt text', async ({ page }) => {
 // console.log(chalk.default.blue('\n🔍 Checking <img> alt text...\n'));
  await page.goto('https://www.orchestry.com/');
  const imgs = await page.$$('img');

  for (const img of imgs) {
    const alt = await img.getAttribute('alt');
    if (!alt || alt.trim().length === 0) {
      const outer = await img.evaluate(el => el.outerHTML);
      console.error(
        chalk.default.yellow.bold('🖼️ [Accessibility] Image missing alt text:\n') +
        chalk.default.gray(outer)
      );
    }
    expect(alt?.trim().length).toBeGreaterThan(0);
  }
});

// 3. Focusable Elements Test

test('All interactive elements should be focusable', async ({ page }) => {
 // console.log(chalk.default.blue('\n🔍 Checking focusability of interactive elements...\n'));
  await page.goto('https://www.orchestry.com/');
  const focusable = await page.$$('button, a[href], input, textarea, select, [tabindex]');

  for (const el of focusable) {
    const isVisible = await el.isVisible();
    const isDisabled = await el.getAttribute('disabled');
    const tabIndex = await el.getAttribute('tabindex');

    if (isVisible && isDisabled === null && tabIndex !== '-1') {
      const canFocus = await el.evaluate(el => {
        el.focus();
        return document.activeElement === el;
      });
      expect(canFocus).toBe(true);
    }
  }
});

// 4. Empty Heading Tags Test

test('No empty headings (h1-h6)', async ({ page }) => {
 // console.log(chalk.default.blue('\n🔍 Checking for empty heading tags...\n'));
  await page.goto('https://www.orchestry.com/');
  const headings = await page.$$('h1, h2, h3, h4, h5, h6');

  for (const h of headings) {
    const text = await h.textContent();
    if (!text || text.trim().length === 0) {
      const outer = await h.evaluate(el => el.outerHTML);
      console.error(
        chalk.default.magenta.bold('⚠️ [Accessibility] Empty heading tag found:\n') +
        chalk.default.gray(outer)
      );
    }
    expect(text?.trim().length).toBeGreaterThan(0);
  }
});

// 5. Skip Link Test

test('Page should have a skip link for accessibility', async ({ page }) => {
  //console.log(chalk.default.blue('\n🔍 Checking for skip link...\n'));
  await page.goto('https://www.orchestry.com/');
  const skipLink = await page.$('a[href^="#"], a.skip-link');
  const isVisible = skipLink && await skipLink.isVisible();
  expect(isVisible).toBe(true);
});
