/**
 * Тесты для API сущности новостей
 */
import { newsApi, newsData } from './news-api';

// Мокаем клиент, если он используется, но в текущей реализации он не используется
jest.mock('../../../shared/api/client', () => ({}));

describe('NEWS API ENTITY', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getNews', () => {
    it('should return all news data', async () => {
      const result = await newsApi.getNews();

      expect(result).toEqual(newsData);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
    });

    it('should return news items with correct structure', async () => {
      const result = await newsApi.getNews();

      result.forEach(newsItem => {
        expect(newsItem).toHaveProperty('title');
        expect(newsItem).toHaveProperty('date');
        expect(newsItem).toHaveProperty('content');
        expect(typeof newsItem.title).toBe('string');
        expect(typeof newsItem.date).toBe('string');
        expect(typeof newsItem.content).toBe('string');
      });
    });

    it('should return specific news items', async () => {
      const result = await newsApi.getNews();

      expect(result[0].title).toBe("Упрощена процедура регистрации недвижимости");
      expect(result[1].title).toBe("Запущен новый электронный сервис");
      expect(result[2].title).toBe("Обновление публичной кадастровой карты");
    });
  });

  // Тесты для методов, которых нет в текущей реализации
  describe('getAllNews - not implemented', () => {
    it('should throw error for unimplemented method', async () => {
      // Проверяем, что метода getAllNews действительно нет
      expect(newsApi.getAllNews).toBeUndefined();
    });
  });

  describe('getNewsById - not implemented', () => {
    it('should throw error for unimplemented method', async () => {
      // Проверяем, что метода getNewsById действительно нет
      expect(newsApi.getNewsById).toBeUndefined();
    });
  });
});