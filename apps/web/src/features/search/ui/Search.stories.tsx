import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Search } from './Search';

const meta = {
  title: 'Features/Search/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {},
  decorators: [
    (Story) => {
      const [value, setValue] = React.useState('пример текста');
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
};

export const Empty: Story = {
  args: {},
};