import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './auth-context';

// Простой тестовый компонент
const TestComponent = () => {
  const auth = useAuth();
  
  return (
    <div>
      <div data-testid="user">{auth.user ? auth.user.name : 'No user'}</div>
      <div data-testid="isAuthenticated">
        {auth.isAuthenticated !== undefined ? auth.isAuthenticated.toString() : 'undefined'}
      </div>
      <div data-testid="isAuthModalOpen">
        {auth.isAuthModalOpen !== undefined ? auth.isAuthModalOpen.toString() : 'undefined'}
      </div>
      <div data-testid="authError">{auth.authError || 'No error'}</div>
      <button onClick={() => auth.login({ name: 'Test User', email: 'test@example.com' })}>
        Login
      </button>
      <button onClick={auth.logout}>Logout</button>
      <button onClick={() => auth.setIsAuthModalOpen(true)}>Open Modal</button>
      <button onClick={() => auth.setAuthError('Test error')}>Set Error</button>
    </div>
  );
};

describe('AUTH CONTEXT', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderWithAuth = (component) => {
    return render(
      <AuthProvider>
        {component}
      </AuthProvider>
    );
  };

  it('should provide initial state', () => {
    renderWithAuth(<TestComponent />);

    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('authError')).toHaveTextContent('No error');
  });

  it('should login user', () => {
    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Login'));

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
  });

  it('should logout user', () => {
    renderWithAuth(<TestComponent />);

    // Сначала логиним
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');

    // Затем разлогиниваем
    fireEvent.click(screen.getByText('Logout'));
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
  });

  it('should set auth error', () => {
    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Set Error'));

    expect(screen.getByTestId('authError')).toHaveTextContent('Test error');
  });

  it('should restore user from localStorage', () => {
    const userData = { name: 'Saved User', email: 'saved@example.com' };
    localStorage.setItem('user', JSON.stringify(userData));

    renderWithAuth(<TestComponent />);

    expect(screen.getByTestId('user')).toHaveTextContent('Saved User');
  });

  it('should clear user from localStorage on logout', () => {
    const userData = { name: 'Saved User', email: 'saved@example.com' };
    localStorage.setItem('user', JSON.stringify(userData));

    renderWithAuth(<TestComponent />);

    // Проверяем что пользователь загрузился из localStorage
    expect(screen.getByTestId('user')).toHaveTextContent('Saved User');

    // Логаутим
    fireEvent.click(screen.getByText('Logout'));

    // Проверяем что очистилось и в localStorage
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should handle multiple state updates correctly', async () => {
    renderWithAuth(<TestComponent />);

    // Множественные действия
    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
      fireEvent.click(screen.getByText('Set Error'));
    });

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(screen.getByTestId('authError')).toHaveTextContent('Test error');
  });
});