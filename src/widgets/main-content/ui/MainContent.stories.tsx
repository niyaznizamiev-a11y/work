// MainContent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MainContent } from './MainContent';
import { AuthProvider } from '../../../features/auth/model/auth-context';

const meta = {
  title: 'Widgets/MainContent',
  component: MainContent,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};