import React from 'react';
import { Search } from '@/features/search';
import { AuthButton } from '@/features/auth';

export function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full"></div>
            <span className="text-xl font-bold">Роскадастр</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Search />
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}