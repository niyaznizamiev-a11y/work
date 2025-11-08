## Последние изменения
        
- **Дата обновления**: 08.11.2025, 19:20:50
- **Измененные файлы**:
  - src/index.js

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