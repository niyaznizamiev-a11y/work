import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../apps/web/src/**/*.mdx",
    "../apps/web/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  webpackFinal: async (config) => {
    // Добавляем алиасы
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../apps/web/src'),
    };

    // Добавляем правило для CSS файлов
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Убираем существующее правило для CSS если есть
    config.module.rules = config.module.rules.filter(rule => {
      if (rule && typeof rule === 'object' && rule.test) {
        return !rule.test.toString().includes('css');
      }
      return true;
    });

    // Добавляем новое правило для CSS с PostCSS
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, '../postcss.config.mjs'),
            },
          },
        },
      ],
    });

    return config;
  }
};
export default config;