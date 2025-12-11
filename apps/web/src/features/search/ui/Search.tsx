import React, { useState } from 'react';

export function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Поиск: "${searchQuery}"`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex">
      <input 
        type="text" 
        className="px-3 py-2 w-64 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        placeholder="Поиск по сайту"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button 
        className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-r-lg transition-colors"
        onClick={handleSearch}
      >
        Найти
      </button>
    </div>
  );
}