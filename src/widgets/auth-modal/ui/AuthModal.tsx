import React from 'react';
import { useAuth } from '@/features/auth';
import { AuthForm } from '@/features/auth';
import { Modal } from '@/shared/ui/Modal/Modal'; // Нужно создать этот компонент

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen } = useAuth();
  
  if (!isAuthModalOpen) return null;
  
  return (
    <Modal 
      isOpen={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)}
      title="Авторизация"
    >
      <AuthForm />
    </Modal>
  );
}