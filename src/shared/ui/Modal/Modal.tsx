import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
          onClick={onClose}
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