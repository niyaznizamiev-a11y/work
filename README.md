## Последние изменения
        
- **Дата обновления**: 08.11.2025, 19:41:51
- **Измененные файлы**:
  - .github/workflows/playwright.yml
  - .gitignore
  - node_modules/.package-lock.json
  - node_modules/@types/node/README.md
  - node_modules/@types/node/console.d.ts
  - node_modules/@types/node/package.json
  - node_modules/@types/node/process.d.ts
  - node_modules/@types/node/sqlite.d.ts
  - node_modules/@types/node/url.d.ts
  - package-lock.json
  - package.json
  - playwright.config.ts
  - tests/example.spec.ts

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