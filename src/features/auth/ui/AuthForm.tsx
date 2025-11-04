import React from 'react';
import { useAuth } from '../model/use-auth';
import { useAuthSubmit } from '../lib/use-auth-submit';

export function AuthForm() {
  const { 
    isLoginMode, 
    authError, 
    setIsLoginMode, 
    setAuthError 
  } = useAuth();
  
  const { handleAuthSubmit } = useAuthSubmit();

  return (
    <>
      {authError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {authError}
        </div>
      )}
      
      <form onSubmit={handleAuthSubmit} className="space-y-4">
        <input 
          type="text" 
          name="username"
          placeholder="Имя пользователя" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
        {!isLoginMode && (
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        )}
        <input 
          type="password" 
          name="password"
          placeholder="Пароль" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
        <button 
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg transition-colors"
        >
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      
      <div className="text-center mt-4">
        <button 
          type="button"
          className="text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setAuthError('');
          }}
        >
          {isLoginMode 
            ? 'Нет аккаунта? Зарегистрироваться' 
            : 'Уже есть аккаунт? Войти'
          }
        </button>
      </div>
    </>
  );
}