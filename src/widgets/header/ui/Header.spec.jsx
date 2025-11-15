import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

// Мокаем компоненты, которые используются в Header
jest.mock('../../../features/search', () => ({
  Search: () => <div data-testid="search-component">Search Component</div>
}));

jest.mock('../../../features/auth', () => ({
  AuthButton: () => <div data-testid="auth-button">Auth Button</div>
}));

describe('HEADER WIDGET', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render header with company name', () => {
    render(<Header />);

    expect(screen.getByText('Роскадастр')).toBeInTheDocument();
  });

  it('should render all main components', () => {
    render(<Header />);

    expect(screen.getByText('Роскадастр')).toBeInTheDocument();
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
    expect(screen.getByTestId('auth-button')).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-blue-900', 'text-white', 'shadow-lg');
  });

  it('should render logo element', () => {
    render(<Header />);

    const logo = document.querySelector('.w-8.h-8.bg-white.rounded-full');
    expect(logo).toBeInTheDocument();
  });

  it('should have responsive container', () => {
    render(<Header />);

    const container = document.querySelector('.container.mx-auto');
    expect(container).toBeInTheDocument();
  });
});