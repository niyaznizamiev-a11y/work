import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Базовые настройки для ВСЕХ файлов
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020
      }
    }
  },

  // TypeScript файлы БЕЗ project checking
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser
      // УБИРАЕМ parserOptions.project
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      // Ослабляем строгие правила
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off'
    }
  },
  // Storybook файлы - специальные правила
{
  files: ['.storybook/**/*', '**/*.stories.{ts,tsx}'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off', // Разрешаем @ts-nocheck для Storybook
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off'
  }
},
  // React файлы
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    }
  }
];