// src/App.tsx
import React, { useState, useEffect } from 'react';
import { newsData, NewsItem } from './utils';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string>('');

  useEffect(() => {
    setNews(newsData);
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId);
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    console.log({ name, email, message });
    
    alert('Форма отправлена!');
    setIsModalOpen(false);
    e.currentTarget.reset();
  };

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setAuthError('');
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const url = isLoginMode ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
    const body = isLoginMode ? { username, password } : { username, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLoginMode) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('Авторизация успешна!');
        } else {
          alert('Регистрация успешна! Теперь вы можете войти.');
          setIsLoginMode(true);
        }
        setIsAuthModalOpen(false);
        e.currentTarget.reset();
      } else {
        setAuthError(data.error || 'Произошла ошибка');
      }
    } catch (error) {
      setAuthError('Ошибка подключения к серверу');
    }
  };

  const handleLogout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
    alert('Вы вышли из системы');
  };

  const handleSearch = (): void => {
    if (searchQuery.trim()) {
      alert(`Выполняется поиск по запросу: "${searchQuery}". В реальном приложении здесь будет перенаправление на страницу результатов.`);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full"></div>
              <span className="text-xl font-bold">Роскадастр</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex">
                <input 
                  type="text" 
                  className="px-3 py-2 w-64 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  placeholder="Поиск по сайту"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
                <button 
                  className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-r-lg transition-colors"
                  onClick={handleSearch}
                >
                  Найти
                </button>
              </div>
              
              <div className="ml-4">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm">Добро пожаловать, {user.username}</span>
                    <button 
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm transition-colors"
                      onClick={handleLogout}
                    >
                      Выйти
                    </button>
                  </div>
                ) : (
                  <button 
                    className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded transition-colors"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Войти
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold text-blue-900 mb-6 pb-4 border-b-2 border-blue-800">
                Федеральная служба государственной регистрации, кадастра и картографии (Роскадастр)
              </h1>
              
              {user && (
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
              )}
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Роскадастр является федеральным органом исполнительной власти, осуществляющим функции по государственной регистрации прав на недвижимое имущество и сделок с ним, по оказанию государственных услуг в сфере ведения государственного кадастра недвижимости, осуществления государственного кадастрового учёта недвижимого имущества, землеустройства, государственного мониторинга земель, навигационно-картографического обеспечения и др.
              </p>
              
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">Основные направления деятельности</h2>
              
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-1">
                  <button
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                      activeTab === 'tab1' 
                        ? 'bg-blue-800 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTabClick('tab1')}
                  >
                    Регистрация прав
                  </button>
                  <button
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                      activeTab === 'tab2' 
                        ? 'bg-blue-800 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTabClick('tab2')}
                  >
                    Кадастровый учет
                  </button>
                  <button
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                      activeTab === 'tab3' 
                        ? 'bg-blue-800 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTabClick('tab3')}
                  >
                    Картография
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className={`${activeTab === 'tab1' ? 'block' : 'hidden'}`}>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Государственная регистрация прав на недвижимость</h3>
                <p className="text-gray-700 mb-4">Осуществление государственной регистрации прав на недвижимое имущество и сделок с ним, а также предоставление сведений из Единого государственного реестра недвижимости.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Регистрация права собственности</li>
                  <li>Регистрация ипотеки</li>
                  <li>Регистрация договоров аренды</li>
                  <li>Внесение изменений в ЕГРН</li>
                </ul>
              </div>
              
              <div className={`${activeTab === 'tab2' ? 'block' : 'hidden'}`}>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Государственный кадастровый учет</h3>
                <p className="text-gray-700 mb-4">Ведение государственного кадастра недвижимости, осуществление кадастрового учета объектов недвижимости, предоставление сведений ГКН.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Постановка на кадастровый учет</li>
                  <li>Снятие с кадастрового учета</li>
                  <li>Внесение изменений в кадастр</li>
                  <li>Исправление кадастровых ошибок</li>
                </ul>
              </div>
              
              <div className={`${activeTab === 'tab3' ? 'block' : 'hidden'}`}>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Картография и геодезия</h3>
                <p className="text-gray-700 mb-4">Обеспечение государственных нужд в области картографии и геодезии, создание и обновление картографической продукции.</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Создание топографических карт</li>
                  <li>Геодезические измерения</li>
                  <li>Навигационное обеспечение</li>
                  <li>Публичная кадастровая карта</li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-4">Электронные услуги</h2>
              <p className="text-gray-700 mb-4">Роскадастр предоставляет возможность получения государственных услуг в электронном виде через официальный сайт и портал государственных услуг.</p>
              
              <p className="text-gray-700 mb-4">Среди электронных услуг доступны:</p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Получение выписки из ЕГРН</li>
                <li>Подача заявления на государственную регистрацию прав</li>
                <li>Подача заявления на кадастровый учёт</li>
                <li>Получение сведений из фонда данных государственной кадастровой оценки</li>
              </ul>
              
              <button 
                className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                Обратная связь
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Быстрые ссылки</h2>
              <ul className="space-y-3">
                <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">Официальные документы</a></li>
                <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">Реестр кадастровых инженеров</a></li>
                <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">Государственная кадастровая оценка</a></li>
                <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">Публичная кадастровая карта</a></li>
                <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">Электронные сервисы</a></li>
                <li><a href="#" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">Обращения граждан</a></li>
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
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Новости</h2>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                    <p className="text-gray-700 text-sm">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Обратная связь</h2>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <input 
                type="text" 
                name="name"
                placeholder="Ваше имя" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Ваш email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required 
              />
              <textarea 
                name="message"
                placeholder="Ваше сообщение" 
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
              <button 
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => {
                setIsAuthModalOpen(false);
                setAuthError('');
              }}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {isLoginMode ? 'Вход в систему' : 'Регистрация'}
            </h2>
            
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
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2023 Федеральная служба государственной регистрации, кадастра и картографии (Роскадастр)</p>
          <p>Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}

export default App;