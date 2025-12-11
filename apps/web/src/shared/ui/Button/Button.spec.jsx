import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button/Button';

// Самый простой тест - без моков, без контекста
test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('button is disabled when disabled prop is true', () => {
  render(<Button disabled>Disabled Button</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});