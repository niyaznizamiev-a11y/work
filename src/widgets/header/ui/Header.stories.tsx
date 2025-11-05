import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { AuthProvider } from '../../../features/auth/model/auth-context';

const WithProviders = () => (
  <AuthProvider>
    <Header />
  </AuthProvider>
);

const meta = {
  title: 'Widgets/Header',
  component: WithProviders,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WithProviders>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};