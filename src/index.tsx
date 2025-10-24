import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />); // Исправлено: добавлена открывающая скобка <

interface NewsItem {
  title: string;
  date: string;
  content: string;
}

const newsData: NewsItem[] = [
  {
    title: "Упрощена процедура регистрации недвижимости",
    date: "15.10.2023",
    content: "С 1 ноября вступают в силу изменения, упрощающие процедуру государственной регистрации прав на недвижимое имущество."
  },
  {
    title: "Запущен новый электронный сервис",
    date: "10.10.2023",
    content: "Роскадастр запустил новый сервис для онлайн-подачи заявлений на кадастровый учет объектов недвижимости."
  },
  {
    title: "Обновление публичной кадастровой карты",
    date: "05.10.2023",
    content: "Опубликована обновленная версия публичной кадастровой карты с новыми функциональными возможностями."
  }
];

// Функция для загрузки новостей
function loadNews(): void {
  const newsContainer = document.getElementById('news-container');
  if (!newsContainer) return;
  
  newsContainer.innerHTML = '';
  
  newsData.forEach(news => {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
      <h3>${news.title}</h3>
      <p class="news-date">${news.date}</p>
      <p>${news.content}</p>
    `;
    newsContainer.appendChild(newsItem);
  });
}

// Функция для работы с табами
function initTabs(): void {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Убираем активный класс у всех табов и контента
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Добавляем активный класс к выбранному табу и соответствующему контенту
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      if (tabId) {
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      }
    });
  });
}

// Функция для работы с модальным окном
function initModal(): void {
  const modal = document.getElementById('feedbackModal');
  const openBtn = document.getElementById('openFeedback');
  const closeBtn = document.getElementById('closeFeedback');
  const form = document.getElementById('feedbackForm') as HTMLFormElement | null;
  
  if (!modal || !openBtn || !closeBtn || !form) return;
  
  // Открытие модального окна
  openBtn.addEventListener('click', () => {
    (modal as HTMLElement).style.display = 'flex';
  });
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', () => {
    (modal as HTMLElement).style.display = 'none';
  });
  
  // Закрытие при клике вне модального окна
  window.addEventListener('click', (e: MouseEvent) => {
    if (e.target === modal) {
      (modal as HTMLElement).style.display = 'none';
    }
  });
  
  // Обработка отправки формы
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    alert('Спасибо за ваше обращение! Мы свяжемся с вами в ближайшее время.');
    form.reset();
    (modal as HTMLElement).style.display = 'none';
  });
}

// Функция для поиска
function initSearch(): void {
  const searchButton = document.querySelector('.search-button') as HTMLButtonElement | null;
  const searchInput = document.querySelector('.search-input') as HTMLInputElement | null;
  
  if (!searchButton || !searchInput) return;
  
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      alert(`Выполняется поиск по запросу: "${query}". В реальном приложении здесь будет перенаправление на страницу результатов.`);
      // В реальном приложении здесь будет код для выполнения поиска
    }
  });
  
  // Поиск при нажатии Enter
  searchInput.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  loadNews();
  initTabs();
  initModal();
  initSearch();
});