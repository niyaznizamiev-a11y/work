// @ts-nocheck
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  webpackFinal: async (config) => {
    // Найдите правило для обработки CSS
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".css")
    );

    if (cssRule) {
      // Замените существующее правило на новое
      cssRule.use = [
        "style-loader", 
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: ["tailwindcss", "autoprefixer"],
            },
          },
        },
      ];
    }
    return config;
  },
};
export default config;
