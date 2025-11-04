import { useState, useEffect } from 'react';
import { NewsItem } from '@/entities/news';
import { newsApi } from '@/entities/news/api/news-api';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        const newsData = await newsApi.getNews();
        setNews(newsData);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить новости');
        console.error('Error loading news:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  return {
    news,
    isLoading,
    error,
  };
}