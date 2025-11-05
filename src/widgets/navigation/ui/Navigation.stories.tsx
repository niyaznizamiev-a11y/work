import type { Meta, StoryObj } from '../../../../node_modules/@storybook/react/dist/index';
import { Navigation } from './Navigation';

const meta = {
  title: 'Widgets/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};