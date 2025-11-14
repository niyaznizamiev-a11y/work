// AuthModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { AuthModal } from './AuthModal';
import { AuthProvider } from '../../../features/auth/model/auth-context';

const meta = {
  title: 'Widgets/AuthModal',
  component: AuthModal,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};