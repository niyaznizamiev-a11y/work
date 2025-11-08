## Последние изменения
        
- **Дата обновления**: 08.11.2025, 20:29:29
- **Измененные файлы**:
  - dist/main.js
  - package.json
  - playwright.config.ts
  - scripts/visual-testing.js
  - src/features/auth/ui/AuthButton.tsx
  - src/index.js
  - tests/visual-advanced.spec.js
  - tests/visual-advanced.spec.js-snapshots/header-chromium-win32.png
  - tests/visual-advanced.spec.js-snapshots/header-firefox-win32.png
  - tests/visual-advanced.spec.js-snapshots/header-webkit-win32.png
  - tests/visual-advanced.spec.js-snapshots/homepage-header-chromium-win32.png
  - tests/visual-baseline.spec.js
  - tests/visual-comparison.spec.js

---







# work 
подключил husky:
1) скачал husky и lint-staged
2) убрал из файла "pre-commit" npm test
3) в package.json добавил 
"husky": {
    "hooks": {
      "pre-commit" : "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "npm run lint:fix",
      "git add"
    ]
  },