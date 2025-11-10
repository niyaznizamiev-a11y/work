import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../../../entities/user';

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  isLoginMode: boolean;
  authError: string;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsLoginMode: (mode: boolean) => void;
  setAuthError: (error: string) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    // Функция для безопасного получения пользователя
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser) as User;
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    };

    initializeAuth();
  }, []); // Пустой массив зависимостей - выполняется только при монтировании

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthModalOpen,
      isLoginMode,
      authError,
      setIsAuthModalOpen,
      setIsLoginMode,
      setAuthError,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}