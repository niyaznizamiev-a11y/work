#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function updateReadme() {
    console.log('🔄 Обновляю README.md...');
    
    try {
        // Получаем информацию из package.json
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        // Получаем список измененных файлов в этом коммите
        const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
            .split('\n')
            .filter(Boolean);
        
        // Получаем текущую дату
        const currentDate = new Date().toLocaleString('ru-RU');
        
        // Читаем существующий README или создаем базовый
        let readmeContent = '';
        if (fs.existsSync('README.md')) {
            readmeContent = fs.readFileSync('README.md', 'utf8');
        } else {
            readmeContent = `# ${packageJson.name}\n\n`;
        }
        
        // Обновляем или добавляем раздел с последними изменениями
        const changesSection = `## Последние изменения
        
- **Дата обновления**: ${currentDate}
- **Измененные файлы**:
${stagedFiles.map(file => `  - ${file}`).join('\n')}

---

`;
        
        // Если раздел уже существует, обновляем его
        if (readmeContent.includes('## Последние изменения')) {
            const sections = readmeContent.split('## Последние изменения');
            readmeContent = changesSection + sections[1].split('---')[1] || '';
        } else {
            // Иначе добавляем в начало
            readmeContent = changesSection + readmeContent;
        }
        
        // Записываем обновленный README
        fs.writeFileSync('README.md', readmeContent);
        console.log('✅ README.md успешно обновлен');
        
    } catch (error) {
        console.error('❌ Ошибка при обновлении README:', error);
        process.exit(1);
    }
}

// Запускаем обновление
updateReadme();