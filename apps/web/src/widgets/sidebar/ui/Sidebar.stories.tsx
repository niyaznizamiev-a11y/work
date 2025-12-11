// Sidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};