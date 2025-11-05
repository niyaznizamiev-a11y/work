import type { Meta, StoryObj } from '@storybook/react';
import { UserWelcome } from './UserWelcome';
import { AuthProvider } from '../model/auth-context';

const WithProvider = () => (
  <AuthProvider>
    <UserWelcome />
  </AuthProvider>
);

const meta = {
  title: 'Features/UserWelcome',
  component: WithProvider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WithProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};