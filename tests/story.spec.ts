import { test, expect } from '@playwright/test';

test.describe('Story Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('should display loading state initially', async ({ page }) => {
    await expect(page.locator('text=Loading...')).toBeVisible();
  });
  test('should display story avatars after loading', async ({ page }) => {
    await expect(page.getByTestId("avatars-list")).toBeVisible();
  });
  test('should load user avatars after data fetch', async ({ page }) => {
    const count = await page.getByTestId('avatar').all();
    console.log(count);
  });
  test('should open story viewer on avatar click', async ({ page }) => {
    await page.getByTestId('avatar').first().click();
    await expect(page.locator(".story-container")).toBeVisible();
  });
  
  test('should navigate to the next story', async ({ page }) => {
    await page.getByTestId('avatar').first().click();
    await page.locator('.story-container .right-0').click();
    await expect(page.locator('.progress-bar-active')).toHaveClass(/progress-bar-active/);
  });

  test('should navigate to the previous story', async ({ page }) => {
    await page.getByTestId('avatar').first().click();
    await page.locator('.story-container .left-0').click();
    await expect(page.locator('.progress-bar-active')).toHaveClass(/progress-bar-active/);
  });

  test('should close a story on clicking X button', async ({ page }) => {
    await page.getByTestId('avatar').first().click();
    const closeButton = page.locator("role=button", {hasText: "X"});
    console.log(closeButton);
    await closeButton.click();
    await expect(page.locator(".story-container")).not.toBeVisible();
  });

});
