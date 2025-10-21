import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const newsData = [
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
        function loadNews() {
            const newsContainer = document.getElementById('news-container');
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
        function initTabs() {
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
                    document.getElementById(tabId).classList.add('active');
                });
            });
        }

        // Функция для работы с модальным окном
        function initModal() {
            const modal = document.getElementById('feedbackModal');
            const openBtn = document.getElementById('openFeedback');
            const closeBtn = document.getElementById('closeFeedback');
            const form = document.getElementById('feedbackForm');
            
            // Открытие модального окна
            openBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
            });
            
            // Закрытие модального окна
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            // Закрытие при клике вне модального окна
            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
            
            // Обработка отправки формы
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Спасибо за ваше обращение! Мы свяжемся с вами в ближайшее время.');
                form.reset();
                modal.style.display = 'none';
            });
        }

        // Функция для поиска
        function initSearch() {
            const searchButton = document.querySelector('.search-button');
            const searchInput = document.querySelector('.search-input');
            
            searchButton.addEventListener('click', () => {
                const query = searchInput.value.trim();
                if (query) {
                    alert(`Выполняется поиск по запросу: "${query}". В реальном приложении здесь будет перенаправление на страницу результатов.`);
                    // В реальном приложении здесь будет код для выполнения поиска
                }
            });
            
            // Поиск при нажатии Enter
            searchInput.addEventListener('keypress', (e) => {
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