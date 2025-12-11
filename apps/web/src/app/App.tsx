import React from 'react';
import { MainPage } from '../pages/main/ui/Page';
import { AppProviders } from './providers';

export function App() {
  return (
    <AppProviders>
      <MainPage />
    </AppProviders>
  );
}