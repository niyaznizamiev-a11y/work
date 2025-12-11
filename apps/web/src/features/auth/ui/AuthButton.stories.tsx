import type { Meta, StoryObj } from '../../../../node_modules/@storybook/react/dist/index';
import { AuthButton } from './AuthButton';
import { AuthProvider } from '../model/auth-context';

const WithProvider = () => (
  <AuthProvider>
    <AuthButton />
  </AuthProvider>
);

const meta = {
  title: 'Features/AuthButton',  // Группировка по FSD
  component: WithProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WithProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};