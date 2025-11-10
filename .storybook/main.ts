import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: (config) => {
    // Убрали async, так как нет await
    const originalConfig = config;
    
    // Ваши модификации webpack
    if (originalConfig.module?.rules) {
      // Пример: добавляем правило для CSS
      originalConfig.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      });
    }
    
    return originalConfig;
  },
};

export default config;