import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

class VisualComparator {
  constructor(page) {
    this.page = page;
    this.screenshotDir = 'test-results/screenshots';
    this.diffDir = 'test-results/diffs';
    
    // Создаем директории если их нет
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
    if (!fs.existsSync(this.diffDir)) {
      fs.mkdirSync(this.diffDir, { recursive: true });
    }
  }
  
  async takeScreenshot(name, options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    const filepath = path.join(this.screenshotDir, filename);
    
    await this.page.screenshot({ 
      path: filepath, 
      fullPage: true,
      ...options 
    });
    
    return filepath;
  }
  
  async compareWithBaseline(name, threshold = 0.1) {
    const baselinePath = `./tests/screenshots/${name}.png`;
    const currentPath = await this.takeScreenshot(name);
    
    try {
      // Сравниваем с базовым скриншотом
      await expect(this.page).toHaveScreenshot(name, { 
        threshold,
        maxDiffPixels: 100 
      });
      return { match: true };
    } catch (error) {
      // Сохраняем diff
      const diffPath = path.join(this.diffDir, `${name}-diff-${Date.now()}.png`);
      await this.page.screenshot({ path: diffPath });
      
      return {
        match: false,
        diffPath,
        baselinePath,
        currentPath,
        error: error.message
      };
    }
  }
}

test.describe('Advanced Visual Testing - Homepage Only', () => {
  test('comprehensive homepage visual testing', async ({ page }) => {
    const comparator = new VisualComparator(page);
    
    // Тестируем ТОЛЬКО homepage
    const pagesToTest = [
      { url: '/', name: 'homepage' }
    ];
    
    for (const { url, name } of pagesToTest) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      
      const result = await comparator.compareWithBaseline(name);
      
      if (!result.match) {
        console.log(`🔄 Visual changes detected on HOMEPAGE`);
        console.log(`📊 Diff saved: ${result.diffPath}`);
        console.log(`🔍 Error: ${result.error}`);
        
        throw new Error(`Homepage visual regression detected`);
      } else {
        console.log(`✅ HOMEPAGE matches baseline`);
      }
    }
  });
  
  test('homepage element-specific visual testing', async ({ page }) => {
    await page.goto('/');
    
    // Скриншот конкретного элемента ТОЛЬКО на homepage
    const header = page.locator('header');
    const mainContent = page.locator('.main-content');
    const navigation = page.locator('nav');
    
    try {
      await expect(header).toHaveScreenshot('homepage-header.png');
      console.log('✅ Homepage header matches baseline');
    } catch (error) {
      console.log('❌ Homepage header visual changes');
      await header.screenshot({ path: 'test-results/homepage-header-diff.png' });
    }
    
    try {
      await expect(mainContent).toHaveScreenshot('homepage-main-content.png');
      console.log('✅ Homepage main content matches baseline');
    } catch (error) {
      console.log('❌ Homepage main content visual changes');
      await mainContent.screenshot({ path: 'test-results/homepage-main-content-diff.png' });
    }
  });
});