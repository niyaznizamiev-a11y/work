import React from 'react';
import { useAuth } from '../model/auth-context'; // ИЗМЕНИТЬ ИМПОРТ!

export function AuthButton() {
  const { user, logout, setIsAuthModalOpen } = useAuth();

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-sm">Добро пожаловать, {user.username}</span>
        <button 
          className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm transition-colors"
          onClick={logout}
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <button 
      className="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded transition-colors"
      onClick={() => setIsAuthModalOpen(true)}
    >
      Войти
    </button>
  );
}