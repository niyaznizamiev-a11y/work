import React, { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal/Modal';

export function FeedbackModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <>
      <button 
        className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        Обратная связь
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Обратная связь"
      >
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
      </Modal>
    </>
  );
}