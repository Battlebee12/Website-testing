import { test, expect } from '@playwright/test';

let chalk: any;

test.beforeAll(async () => {
  chalk = await import('chalk');
  console.log(chalk.default.cyan.bold('\n🔎 Running home Tests...\n'));
});


test('Orchestry homepage should load and have title', async ({ page }) => {
  await page.goto('https://www.orchestry.com/');
  await expect(page).toHaveTitle(/Orchestry/i);
});









test('Page should not have excessive JavaScript errors', async ({ page }) => {
  await page.goto('https://www.orchestry.com/');

  const errors = await page.evaluate(() => {
    return new Promise<string[]>((resolve) => {
      const originalConsoleError = console.error;
      const errorMessages: string[] = [];

      console.error = (...args: any[]) => {
        errorMessages.push(args.join(' '));
      };

      window.addEventListener('error', (event) => {
        errorMessages.push(event.message);
      });

      setTimeout(() => {
        console.error = originalConsoleError;
        resolve(errorMessages);
      }, 5000); // Wait for 5 seconds to capture errors
    });
  });

  console.log(`📉 JavaScript Errors: ${(errors as string[]).length}`);
  expect((errors as string[]).length).toBeLessThan(10); // Allow up to 10 errors
});




