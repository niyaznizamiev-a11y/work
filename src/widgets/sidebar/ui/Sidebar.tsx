// src/widgets/sidebar/ui/Sidebar.tsx
import React from 'react';
import { NewsList } from '@/widgets/news';

export function Sidebar() {
  const quickLinks = [
    { label: 'Официальные документы', href: '#' },
    { label: 'Реестр кадастровых инженеров', href: '#' },
    { label: 'Государственная кадастровая оценка', href: '#' },
    { label: 'Публичная кадастровая карта', href: '#' },
    { label: 'Электронные сервисы', href: '#' },
    { label: 'Обращения граждан', href: '#' }
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Быстрые ссылки</h2>
        <ul className="space-y-3">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="text-blue-600 hover:text-blue-800 transition-colors block py-1">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Контакты</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Адрес:</strong> 123242, г. Москва, ул. Большая Грузинская, д. 4/6</p>
          <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
          <p><strong>Email:</strong> info@rosreestr.ru</p>
        </div>
      </div>
      
      <NewsList />
    </>
  );
}