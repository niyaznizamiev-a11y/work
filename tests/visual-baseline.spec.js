import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests - Homepage Only', () => {
  test('take homepage baseline screenshot', async ({ page }) => {
    // ТОЛЬКО главная страница
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage.png');
    
    console.log('✅ Homepage baseline screenshot created');
  });
});