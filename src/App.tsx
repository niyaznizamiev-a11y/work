import React, { useState } from 'react';
import './style.css'; // Не забудьте создать файл стилей

function App() {
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId);
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Обработка отправки формы
    alert('Форма отправлена!');
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-text">Роскадастр</div>
          </div>
          <div className="search-form">
            <input type="text" className="search-input" placeholder="Поиск по сайту" />
            <button className="search-button">Найти</button>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#">Главная</a>
          </li>
          <li className="nav-item">
            <a href="#">О службе</a>
            <div className="dropdown-content">
              <a href="#">Структура</a>
              <a href="#">Руководство</a>
              <a href="#">История</a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#">Услуги</a>
            <div className="dropdown-content">
              <a href="#">Государственная регистрация</a>
              <a href="#">Кадастровый учет</a>
              <a href="#">Получение выписок из ЕГРН</a>
            </div>
          </li>
          <li className="nav-item">
            <a href="#">Документы</a>
          </li>
          <li className="nav-item">
            <a href="#">Контакты</a>
          </li>
        </ul>
      </nav>
      
      {/* Main Content */}
      <div className="container">
        <main className="main-content">
          <h1>Федеральная служба государственной регистрации, кадастра и картографии (Роскадастр)</h1>
          
          <p>Роскадастр является федеральным органом исполнительной власти, осуществляющим функции по государственной регистрации прав на недвижимое имущество и сделок с ним, по оказанию государственных услуг в сфере ведения государственного кадастра недвижимости, осуществления государственного кадастрового учёта недвижимого имущества, землеустройства, государственного мониторинга земель, навигационно-картографического обеспечения и др.</p>
          
          <h2>Основные направления деятельности</h2>
          
          {/* Tabs */}
          <div className="tabs">
            <div 
              className={`tab ${activeTab === 'tab1' ? 'active' : ''}`} 
              onClick={() => handleTabClick('tab1')}
            >
              Регистрация прав
            </div>
            <div 
              className={`tab ${activeTab === 'tab2' ? 'active' : ''}`} 
              onClick={() => handleTabClick('tab2')}
            >
              Кадастровый учет
            </div>
            <div 
              className={`tab ${activeTab === 'tab3' ? 'active' : ''}`} 
              onClick={() => handleTabClick('tab3')}
            >
              Картография
            </div>
          </div>
          
          {/* Tab Content */}
          <div className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`} id="tab1">
            <h3>Государственная регистрация прав на недвижимость</h3>
            <p>Осуществление государственной регистрации прав на недвижимое имущество и сделок с ним, а также предоставление сведений из Единого государственного реестра недвижимости.</p>
            <ul className="services-list">
              <li>Регистрация права собственности</li>
              <li>Регистрация ипотеки</li>
              <li>Регистрация договоров аренды</li>
              <li>Внесение изменений в ЕГРН</li>
            </ul>
          </div>
          
          <div className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">
            <h3>Государственный кадастровый учет</h3>
            <p>Ведение государственного кадастра недвижимости, осуществление кадастрового учета объектов недвижимости, предоставление сведений ГКН.</p>
            <ul className="services-list">
              <li>Постановка на кадастровый учет</li>
              <li>Снятие с кадастрового учета</li>
              <li>Внесение изменений в кадастр</li>
              <li>Исправление кадастровых ошибок</li>
            </ul>
          </div>
          
          <div className={`tab-content ${activeTab === 'tab3' ? 'active' : ''}`} id="tab3">
            <h3>Картография и геодезия</h3>
            <p>Обеспечение государственных нужд в области картографии и геодезии, создание и обновление картографической продукции.</p>
            <ul className="services-list">
              <li>Создание топографических карт</li>
              <li>Геодезические измерения</li>
              <li>Навигационное обеспечение</li>
              <li>Публичная кадастровая карта</li>
            </ul>
          </div>
          
          <h2>Электронные услуги</h2>
          <p>Роскадастр предоставляет возможность получения государственных услуг в электронном виде через официальный сайт и портал государственных услуг.</p>
          
          <p>Среди электронных услуг доступны:</p>
          
          <ul className="services-list">
            <li>Получение выписки из ЕГРН</li>
            <li>Подача заявления на государственную регистрацию прав</li>
            <li>Подача заявления на кадастровый учёт</li>
            <li>Получение сведений из фонда данных государственной кадастровой оценки</li>
          </ul>
          
          <button 
            className="feedback-button" 
            onClick={() => setIsModalOpen(true)}
          >
            Обратная связь
          </button>
        </main>
        
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Быстрые ссылки</h2>
          
          <ul className="services-list">
            <li><a href="#">Официальные документы</a></li>
            <li><a href="#">Реестр кадастровых инженеров</a></li>
            <li><a href="#">Государственная кадастровая оценка</a></li>
            <li><a href="#">Публичная кадастровая карта</a></li>
            <li><a href="#">Электронные сервисы</a></li>
            <li><a href="#">Обращения граждан</a></li>
          </ul>
          
          <div className="contact-info">
            <h2>Контакты</h2>
            <p><strong>Адрес:</strong> 123242, г. Москва, ул. Большая Грузинская, д. 4/6</p>
            <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
            <p><strong>Email:</strong> info@rosreestr.ru</p>
          </div>
          
          <h2>Новости</h2>
          <div id="news-container">
            {/* Новости будут загружены через JavaScript */}
            <p>Здесь будут отображаться последние новости</p>
          </div>
        </aside>
      </div>
      
      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="modal" id="feedbackModal">
          <div className="modal-content">
            <span 
              className="close-modal" 
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h2>Обратная связь</h2>
            <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
              <input type="text" placeholder="Ваше имя" required />
              <input type="email" placeholder="Ваш email" required />
              <textarea placeholder="Ваше сообщение" rows={5} required></textarea>
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="footer">
        <p>© 2023 Федеральная служба государственной регистрации, кадастра и картографии (Роскадастр)</p>
        <p>Все права защищены</p>
      </footer>
    </div>
  );
}

export default App;