import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Получаем абсолютный путь к корневой src директории и нормализуем для кроссплатформенности
const rootSrcDir = path.resolve(__dirname, '../../../src').replace(/\\/g, '/');

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    `${rootSrcDir}/**/*.mdx`,
    `${rootSrcDir}/**/*.stories.@(js|jsx|mjs|ts|tsx)`
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config) => {
    // Добавляем алиасы - указываем на корневой src
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../../../src'),
    };
    
    // Добавляем корневую директорию в modules для разрешения модулей
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../../../'),
      path.resolve(__dirname, '../../../node_modules'),
    ];

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
              config: path.resolve(__dirname, '../../../postcss.config.mjs'),
            },
          },
        },
      ],
    });

    return config;
  }
};

export default config;

