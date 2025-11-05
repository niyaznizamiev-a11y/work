import React from 'react';
import { useAuth } from '@/features/auth/model/auth-context';
import { Modal } from '@/shared/ui/Modal/Modal';
import { AuthForm } from '@/features/auth';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, setAuthError } = useAuth();
  
  return (
    <Modal 
      isOpen={isAuthModalOpen} 
      onClose={() => {
        setIsAuthModalOpen(false);
        setAuthError('');
      }}
      title="Авторизация"
    >
      <AuthForm />
    </Modal>
  );
}