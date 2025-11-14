// FeedbackModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackModal } from './FeedbackModal';

const meta = {
  title: 'Widgets/FeedbackModal',
  component: FeedbackModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FeedbackModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};