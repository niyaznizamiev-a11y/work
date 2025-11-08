import { test, expect } from '@playwright/test';

test.describe('Visual Comparison Tests - Homepage Only', () => {
  let page;
  
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });
  
  test.afterEach(async () => {
    await page.close();
  });
  
  test('compare homepage with baseline', async () => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    try {
      // Сравниваем с базовым скриншотом
      await expect(page).toHaveScreenshot('homepage.png');
      console.log('✅ Homepage matches baseline');
    } catch (error) {
      console.log('❌ Homepage visual changes detected');
      // Сохраняем diff изображение
      await page.screenshot({ path: 'test-results/homepage-diff.png' });
      throw error;
    }
  });
});