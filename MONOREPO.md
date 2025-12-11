# Монорепозиторий SFB

Этот проект настроен как монорепозиторий с использованием npm workspaces.

## Структура проекта

```
sfb/
├── apps/
│   ├── web/          # Веб-приложение
│   └── storybook/    # Storybook для компонентов
├── packages/
│   ├── shared/       # Общие утилиты и API
│   └── ui/           # Общие UI компоненты
├── services/
│   └── server/       # Backend сервер
└── package.json      # Корневой package.json с workspaces
```

## Установка зависимостей

Установите все зависимости для всех workspace:

```bash
npm install
```

## Работа с workspace

### Запуск приложений

```bash
# Запуск веб-приложения в режиме разработки
npm run web:start

# Сборка веб-приложения
npm run web:build

# Запуск Storybook
npm run storybook:dev

# Сборка Storybook
npm run storybook:build

# Запуск сервера
npm run server:start

# Запуск сервера в режиме разработки (с nodemon)
npm run server:dev

# Запуск всего (сервер + веб-приложение)
npm run dev:all
```

### Работа с конкретным workspace

Вы можете запускать команды в конкретном workspace:

```bash
# Установка зависимости в конкретный workspace
npm install <package> --workspace=@sfb/web

# Запуск скрипта в конкретном workspace
npm run <script> --workspace=@sfb/web

# Или используя короткий синтаксис
npm run <script> -w @sfb/web
```

## Пакеты

### @sfb/shared

Общие утилиты и API клиенты. Используется другими пакетами и приложениями.

```typescript
import { apiClient, baseApi } from '@sfb/shared';
import { cn } from '@sfb/shared/lib/utils';
```

### @sfb/ui

Общие UI компоненты (Button, Modal и т.д.).

```typescript
import { Button, Modal } from '@sfb/ui';
```

### @sfb/web

Основное веб-приложение.

### @sfb/storybook

Storybook для разработки и документирования компонентов.

### @sfb/server

Backend сервер на Express.js.

## Добавление нового workspace

1. Создайте директорию в соответствующей папке (`apps/`, `packages/`, или `services/`)
2. Создайте `package.json` с уникальным именем в формате `@sfb/<name>`
3. Установите зависимости: `npm install`
4. Добавьте скрипты в корневой `package.json` для удобства

## Зависимости

- Общие зависимости устанавливаются в корневой `package.json`
- Специфичные для workspace зависимости устанавливаются в соответствующий `package.json`
- Workspace могут зависеть друг от друга через имена пакетов (например, `@sfb/shared`)

## Примечания

- Все workspace помечены как `private: true` - они не будут опубликованы в npm
- Используется `.npmrc` для настройки hoisting зависимостей
- TypeScript настройки могут быть переопределены в каждом workspace при необходимости











