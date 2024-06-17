import { test, expect } from '@playwright/test';

test.describe('Story Component', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:3000'); // Adjust the URL as needed to where your Story component is rendered
  });
});
