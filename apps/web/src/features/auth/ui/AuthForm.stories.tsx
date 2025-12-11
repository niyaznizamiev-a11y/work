import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AuthForm } from './AuthForm';
import { AuthProvider } from '../model/auth-context';

const meta = {
  title: 'Features/Auth/AuthForm',
  component: AuthForm,
  decorators: [
    (Story) => (
      <AuthProvider>
        <div className="w-80">
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginMode: Story = {
  args: {},
};

export const RegisterMode: Story = {
  args: {},
};

export const WithError: Story = {
  decorators: [
    (Story) => (
      <AuthProvider>
        <div className="w-80">
          <Story />
          <script>
            {/* Для демонстрации ошибки можно использовать mock или добавить состояние */}
          </script>
        </div>
      </AuthProvider>
    ),
  ],
};