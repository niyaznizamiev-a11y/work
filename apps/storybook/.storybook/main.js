import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Абсолютный путь к приложению web
const webAppDir = path.resolve(__dirname, '../../web').replace(/\\/g, '/');
const webSrcDir = path.resolve(webAppDir, 'src').replace(/\\/g, '/');

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    `${webSrcDir}/**/*.mdx`,
    `${webSrcDir}/**/*.stories.@(js|jsx|mjs|ts|tsx)`
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
    // Исправляем алиасы - указываем на apps/web/src
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': webSrcDir,
      '@app': path.resolve(webSrcDir, 'app'),
      '@entities': path.resolve(webSrcDir, 'entities'),
      '@features': path.resolve(webSrcDir, 'features'),
      '@widgets': path.resolve(webSrcDir, 'widgets'),
      '@shared': path.resolve(webSrcDir, 'shared'),
    };
    
    // Добавляем корневую директорию для node_modules
    const rootDir = path.resolve(__dirname, '../../../');
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      rootDir,
      path.resolve(rootDir, 'node_modules'),
    ];

    // Правило для CSS с PostCSS
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // Удаляем старые CSS правила
    config.module.rules = config.module.rules.filter(rule => {
      if (rule && typeof rule === 'object' && rule.test) {
        return !rule.test.toString().includes('css');
      }
      return true;
    });

    // Новое правило для CSS
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(rootDir, 'postcss.config.mjs'), // Убедитесь, что файл .js, а не .mjs
            },
          },
        },
      ],
    });

    return config;
  }
};

export default config;