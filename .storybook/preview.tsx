import type { Preview } from '@storybook/react';
import '../apps/web/src/app/styles/globals.css'; // ✅ Возвращаем импорт

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;