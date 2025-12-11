/**
 * Тесты для хука отправки формы аутентификации
 */
import { renderHook, act } from '@testing-library/react';
import { useAuthSubmit } from './use-auth-submit';
import { useAuth } from '../model/auth-context';

// Мокаем контекст
jest.mock('../model/auth-context');

describe('USE AUTH SUBMIT HOOK', () => {
  const mockLogin = jest.fn();
  const mockSetIsAuthModalOpen = jest.fn();
  const mockSetAuthError = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      isLoginMode: true,
      login: mockLogin,
      setIsAuthModalOpen: mockSetIsAuthModalOpen,
      setAuthError: mockSetAuthError
    });

    // Мокаем fetch глобально
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Создаем реальный HTMLFormElement для тестов
  const createMockForm = (formData = {}) => {
    const form = document.createElement('form');
    
    // Добавляем поля в форму
    Object.entries(formData).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    // Мокаем метод reset
    form.reset = jest.fn();
    
    return form;
  };

  it('should handle login submission successfully', async () => {
    // Настраиваем мок для логина
    useAuth.mockReturnValue({
      isLoginMode: true,
      login: mockLogin,
      setIsAuthModalOpen: mockSetIsAuthModalOpen,
      setAuthError: mockSetAuthError
    });

    // Мокаем успешный ответ
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: 1, username: 'testuser' } })
    });

    const { result } = renderHook(() => useAuthSubmit());

    // Создаем реальную форму с данными
    const mockForm = createMockForm({
      username: 'testuser',
      password: 'password123'
    });

    const mockEvent = {
      currentTarget: mockForm,
      preventDefault: jest.fn()
    };

    await act(async () => {
      await result.current.handleAuthSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockSetAuthError).toHaveBeenCalledWith('');
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/login',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'password123' })
      })
    );
    expect(mockLogin).toHaveBeenCalledWith({ id: 1, username: 'testuser' });
    expect(mockSetIsAuthModalOpen).toHaveBeenCalledWith(false);
    expect(mockForm.reset).toHaveBeenCalled();
  });

  it('should handle registration submission', async () => {
    // Настраиваем мок для регистрации
    useAuth.mockReturnValue({
      isLoginMode: false,
      login: mockLogin,
      setIsAuthModalOpen: mockSetIsAuthModalOpen,
      setAuthError: mockSetAuthError
    });

    // Мокаем успешный ответ
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    // Мокаем alert
    global.alert = jest.fn();

    const { result } = renderHook(() => useAuthSubmit());

    // Создаем реальную форму с данными для регистрации
    const mockForm = createMockForm({
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123'
    });

    const mockEvent = {
      currentTarget: mockForm,
      preventDefault: jest.fn()
    };

    await act(async () => {
      await result.current.handleAuthSubmit(mockEvent);
    });

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/register',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: 'newuser', 
          email: 'new@example.com', 
          password: 'password123' 
        })
      })
    );
    expect(global.alert).toHaveBeenCalledWith('Регистрация успешна! Теперь вы можете войти.');
    expect(mockSetIsAuthModalOpen).toHaveBeenCalledWith(false);
  });

  it('should handle API error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' })
    });

    const { result } = renderHook(() => useAuthSubmit());

    const mockForm = createMockForm({
      username: 'testuser',
      password: 'wrongpassword'
    });

    const mockEvent = {
      currentTarget: mockForm,
      preventDefault: jest.fn()
    };

    await act(async () => {
      await result.current.handleAuthSubmit(mockEvent);
    });

    expect(mockSetAuthError).toHaveBeenCalledWith('Invalid credentials');
  });

  it('should handle network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useAuthSubmit());

    const mockForm = createMockForm({
      username: 'testuser',
      password: 'password123'
    });

    const mockEvent = {
      currentTarget: mockForm,
      preventDefault: jest.fn()
    };

    await act(async () => {
      await result.current.handleAuthSubmit(mockEvent);
    });

    expect(mockSetAuthError).toHaveBeenCalledWith('Ошибка подключения к серверу');
  });

  it('should extract form data correctly for login mode', async () => {
    useAuth.mockReturnValue({
      isLoginMode: true,
      login: mockLogin,
      setIsAuthModalOpen: mockSetIsAuthModalOpen,
      setAuthError: mockSetAuthError
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: 1, username: 'testuser' } })
    });

    const { result } = renderHook(() => useAuthSubmit());

    const mockForm = createMockForm({
      username: 'testuser',
      password: 'password123'
      // email не должен включаться в login запрос
    });

    const mockEvent = {
      currentTarget: mockForm,
      preventDefault: jest.fn()
    };

    await act(async () => {
      await result.current.handleAuthSubmit(mockEvent);
    });

    // Проверяем что в login запросе только username и password
    const requestBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(requestBody).toEqual({
      username: 'testuser',
      password: 'password123'
    });
    expect(requestBody.email).toBeUndefined();
  });

  it('should extract form data correctly for register mode', async () => {
    useAuth.mockReturnValue({
      isLoginMode: false,
      login: mockLogin,
      setIsAuthModalOpen: mockSetIsAuthModalOpen,
      setAuthError: mockSetAuthError
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    const { result } = renderHook(() => useAuthSubmit());

    const mockForm = createMockForm({
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123'
    });

    const mockEvent = {
      currentTarget: mockForm,
      preventDefault: jest.fn()
    };

    await act(async () => {
      await result.current.handleAuthSubmit(mockEvent);
    });

    // Проверяем что в register запросе все поля
    const requestBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(requestBody).toEqual({
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123'
    });
  });
});