import { NewsItem } from '../model/types';

export const newsData: NewsItem[] = [
  {
    title: "Упрощена процедура регистрации недвижимости",
    date: "15.10.2023",
    content: "С 1 ноября вступают в силу изменения, упрощающие процедуру государственной регистрации прав на недвижимое имущество."
  },
  // ... остальные новости
];

export const newsApi = {
  getNews: (): Promise<NewsItem[]> => {
    return Promise.resolve(newsData);
  },
};