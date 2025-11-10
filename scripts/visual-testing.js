#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class VisualTestManager {
  constructor() {
    this.baselineDir = './tests/screenshots';
    this.resultsDir = './test-results';
  }
  
  createBaseline() {
    console.log('📸 Creating baseline screenshots...');
    try {
      execSync('npx playwright test tests/visual-baseline.spec.js --update-snapshots', {
        stdio: 'inherit'
      });
      console.log('✅ Baseline screenshots created');
    } catch (error) {
      console.log('❌ Failed to create baseline');
    }
  }
  
  runComparison() {
    console.log('🔍 Running visual comparison...');
    try {
      execSync('npx playwright test tests/visual-comparison.spec.js', {
        stdio: 'inherit'
      });
      console.log('✅ Visual comparison completed');
    } catch (error) {
      console.log('❌ Visual changes detected');
    }
  }
  
  generateReport() {
    console.log('📊 Generating visual test report...');
    
    const diffFiles = fs.existsSync(this.resultsDir) 
      ? fs.readdirSync(this.resultsDir).filter(f => f.includes('diff'))
      : [];
    
    if (diffFiles.length > 0) {
      console.log(`\n🔄 Found ${diffFiles.length} visual differences:`);
      diffFiles.forEach(file => {
        console.log(`   - ${file}`);
      });
      
      // Сохраняем отчет
      const report = {
        timestamp: new Date().toISOString(),
        diffs: diffFiles,
        summary: `${diffFiles.length} visual changes detected`
      };
      
      fs.writeFileSync(
        path.join(this.resultsDir, 'visual-report.json'),
        JSON.stringify(report, null, 2)
      );
    } else {
      console.log('✅ No visual changes detected');
    }
  }
}

// Запуск
const manager = new VisualTestManager();
const command = process.argv[2];

switch (command) { 
  case 'baseline':
    manager.createBaseline();
    break;
  case 'compare':
    manager.runComparison();
    manager.generateReport();
    break;
  default:
    console.log('Usage: node scripts/visual-testing.js [baseline|compare]');
}