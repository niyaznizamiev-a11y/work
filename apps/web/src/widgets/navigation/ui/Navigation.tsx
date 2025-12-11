import React from 'react';

export function Navigation() {
  return (
    <nav className="bg-blue-800 shadow-md">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8">
          <li className="py-3">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Главная</a>
          </li>
          <li className="py-3 relative group">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">О службе</a>
            <div className="absolute left-0 mt-1 w-48 bg-blue-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-t-lg">Структура</a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700">Руководство</a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-b-lg">История</a>
            </div>
          </li>
          <li className="py-3 relative group">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Услуги</a>
            <div className="absolute left-0 mt-1 w-56 bg-blue-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-t-lg">Государственная регистрация</a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700">Кадастровый учет</a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-b-lg">Получение выписок из ЕГРН</a>
            </div>
          </li>
          <li className="py-3">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Документы</a>
          </li>
          <li className="py-3">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Контакты</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}