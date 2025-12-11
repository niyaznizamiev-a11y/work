import React from 'react';
import { useAuth } from '../model/auth-context';
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
    <div className="w-full">
      {authError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {authError}
        </div>
      )}
      
      <form onSubmit={handleAuthSubmit} className="space-y-4">
        <div>
          <input 
            type="text" 
            name="username"
            placeholder="Имя пользователя" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>
        
        {!isLoginMode && (
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
        )}
        
        <div>
          <input 
            type="password" 
            name="password"
            placeholder="Пароль" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg transition-colors font-medium"
        >
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      
      <div className="text-center mt-4 pt-4 border-t border-gray-200">
        <button 
          type="button"
          className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
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
    </div>
  );
}