import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Основная кнопка',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Вторичная кнопка',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Опасное действие',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Маленькая кнопка',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Большая кнопка',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Неактивная кнопка',
    disabled: true,
  },
};

export const WithClick: Story = {
  args: {
    variant: 'primary',
    children: 'Кликни меня',
    onClick: () => alert('Кнопка нажата!'),
  },
};