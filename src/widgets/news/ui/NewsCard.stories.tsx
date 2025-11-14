// NewsCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewsCard } from './NewsCard';

const meta = {
  title: 'Widgets/News/NewsCard',
  component: NewsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    news: {
      title: 'Заголовок новости',
      date: '15 декабря 2023',
      content: 'Краткое описание новости или анонс события...'
    }
  },
};