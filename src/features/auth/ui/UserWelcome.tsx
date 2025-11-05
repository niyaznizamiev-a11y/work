import React from 'react';
import { useAuth } from '../model/auth-context'; // Изменено с useAuthStore

export function UserWelcome() {
  const { user } = useAuth(); // Изменено

  if (!user) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-2">Добро пожаловать в личный кабинет, {user.username}!</h3>
      <p className="text-blue-800 mb-3">Теперь вам доступны дополнительные функции:</p>
      <ul className="list-disc list-inside text-blue-700 space-y-1">
        <li>Просмотр истории обращений</li>
        <li>Отслеживание статуса заявок</li>
        <li>Персональные уведомления</li>
        <li>Быстрая подача документов</li>
      </ul>
    </div>
  );
}