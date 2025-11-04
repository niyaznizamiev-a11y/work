import React from 'react';
import { NewsItem } from '@/entities/news';

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="pb-4 border-b border-gray-200 last:border-b-0">
      <h3 className="font-semibold text-gray-800 mb-1 hover:text-blue-600 transition-colors cursor-pointer">
        {news.title}
      </h3>
      <p className="text-sm text-gray-500 mb-2">{news.date}</p>
      <p className="text-gray-700 text-sm leading-relaxed">{news.content}</p>
    </div>
  );
}