import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          // Используем функциональную форму setState для безопасного обновления
          setUser(prevUser => {
            if (JSON.stringify(prevUser) !== JSON.stringify(parsedUser)) {
              return parsedUser;
            }
            return prevUser;
          });
          setIsAuthenticated(prev => prev ? prev : true);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('user');
        }
      }
    };

    initializeAuth();
  }, []); // Пустой массив зависимостей - эффект выполняется только при монтировании

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};