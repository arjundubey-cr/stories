import { test, expect } from '@playwright/test';

test.describe('Story Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:3000');
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
    const avatar = page.getByTestId('avatar').first();
    await avatar.click();
    await expect(page.locator(".story-container")).toBeVisible();
  });
  
  test('should navigate to the next story', async ({ page }) => {
    const avatar = page.getByTestId('avatar').first();
    await avatar.click();
    await page.locator('.story-container .right-0').click();
    await expect(page.locator('.progress-bar-active')).toHaveClass(/progress-bar-active/);
  });

  test('should navigate to the previous story', async ({ page }) => {
    const avatar = page.getByTestId('avatar').first();
    await avatar.click();
    await page.locator('.story-container .left-0').click();
    await expect(page.locator('.progress-bar-active')).toHaveClass(/progress-bar-active/);
  });

  test('should complete a story after 5 sec', async ({ page }) => {
    const avatar = page.getByTestId('avatar').first();
    await avatar.click();
    await expect(page.locator('.progress-bar-finished')).toBeVisible({ timeout: 6000});
  });

  test('should close a story on clicking X button', async ({ page }) => {
    const avatar = page.getByTestId('avatar').first();
    await avatar.click();
    const closeButton = page.locator("role=button", {hasText: "X"});
    console.log(closeButton);
    await closeButton.click();
    await expect(page.locator(".story-container")).not.toBeVisible();
  });

});
