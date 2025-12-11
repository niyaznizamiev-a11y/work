import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Обработчик Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      data-testid="modal-backdrop"
      onClick={onClose} // Закрытие по клику на бэкдроп
    >
      <div 
        className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на контент
      >
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold text-blue-900 mb-6 pr-8">{title}</h2>
        
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}











