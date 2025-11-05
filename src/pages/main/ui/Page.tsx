import React from 'react';
import { Header } from '@/widgets/header';
import { Navigation } from '@/widgets/navigation';
import { MainContent } from '@/widgets/main-content';
import { AuthModal } from '@/widgets/auth-modal';
import { Footer } from '@/widgets/footer';

export function MainPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <MainContent />
      <Footer />
      <AuthModal />
    </div>
  );
}