/**
 * Тесты для хука работы с новостями
 */
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useNews } from './use-news';
import { newsApi } from '../../../entities/news/api/news-api';

jest.mock('../../../entities/news/api/news-api');

describe('USE NEWS HOOK', () => {
  const mockNews = [
    { title: 'News 1', date: '2023-01-01', content: 'Content 1' },
    { title: 'News 2', date: '2023-01-02', content: 'Content 2' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch news on initial render', async () => {
    newsApi.getNews.mockResolvedValue(mockNews);

    const { result } = renderHook(() => useNews());

    // Проверяем начальное состояние
    expect(result.current.isLoading).toBe(true);
    expect(result.current.news).toEqual([]);
    expect(result.current.error).toBe(null);

    // Ждем завершения загрузки
    await act(async () => {
      await Promise.resolve();
    });

    // Проверяем состояние после загрузки
    expect(result.current.isLoading).toBe(false);
    expect(result.current.news).toEqual(mockNews);
    expect(result.current.error).toBe(null);
    expect(newsApi.getNews).toHaveBeenCalledTimes(1);
  });

  it('should handle news fetching error', async () => {
    const error = new Error('Fetch failed');
    newsApi.getNews.mockRejectedValue(error);

    const { result } = renderHook(() => useNews());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe('Не удалось загрузить новости');
    expect(result.current.news).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should return correct data structure', () => {
    newsApi.getNews.mockResolvedValue(mockNews);

    const { result } = renderHook(() => useNews());

    // Проверяем структуру возвращаемого объекта
    expect(result.current).toHaveProperty('news');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    
    // Проверяем типы данных
    expect(Array.isArray(result.current.news)).toBe(true);
    expect(typeof result.current.isLoading).toBe('boolean');
    
    // error может быть string или null
    expect(result.current.error === null || typeof result.current.error === 'string').toBe(true);
  });

  it('should have proper initial state', () => {
    newsApi.getNews.mockResolvedValue(mockNews);

    const { result } = renderHook(() => useNews());

    // Проверяем начальные значения
    expect(result.current.news).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should call news API only once on mount', async () => {
    newsApi.getNews.mockResolvedValue(mockNews);

    const { result } = renderHook(() => useNews());

    await act(async () => {
      await Promise.resolve();
    });

    expect(newsApi.getNews).toHaveBeenCalledTimes(1);
  });
});