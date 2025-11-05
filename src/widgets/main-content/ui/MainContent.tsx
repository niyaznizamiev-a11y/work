import React, { useState } from 'react';
import { UserWelcome } from '@/features/auth/ui/UserWelcome';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';
import { FeedbackModal } from '@/widgets/feedback-modal/ui/FeedbackModal';

export function MainContent() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-6 pb-4 border-b-2 border-blue-800">
              Федеральная служба государственной регистрации, кадастра и картографии (Роскадастр)
            </h1>
            
            <UserWelcome />
            
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
            
            <FeedbackModal />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}