import React from 'react';

export function Navigation() {
  return (
    <nav className="bg-blue-800 shadow-md">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8">
          <li className="py-3">
            <a href="#" className="text-white hover:text-blue-200 transition-colors">Главная</a>
          </li>
          {/* Остальная навигация */}
        </ul>
      </div>
    </nav>
  );
}