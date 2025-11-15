// update-version.js
const fs = require('fs');
const packageJson = require('../package.json');

// Обновляем версию в HTML файлах
function updateHtmlFiles(version) {
  const files = ['./index.html', './src/templates/footer.html'];
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Заменяем версию в meta-теге
      content = content.replace(
        /<meta name="version" content="[^"]*">/,
        `<meta name="version" content="${version}">`
      );
      
      // Заменяем версию в футере
      content = content.replace(
        /<span class="version">v\d+\.\d+\.\d+<\/span>/,
        `<span class="version">v${version}</span>`
      );
      
      fs.writeFileSync(file, content, 'utf8');
    }
  });
}

// Создаем/обновляем version.txt
function createVersionFile(version) {
  fs.writeFileSync('./version.txt', version, 'utf8');
  console.log(`✅ Версия обновлена: ${version}`);
}

const version = packageJson.version;
updateHtmlFiles(version);
createVersionFile(version);