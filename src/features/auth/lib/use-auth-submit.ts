import { useAuth } from '../model/auth-context';

export function useAuthSubmit() {
  const { 
    isLoginMode, 
    login, 
    setIsAuthModalOpen, 
    setAuthError 
  } = useAuth();

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError('');
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const url = isLoginMode ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/register';
    const body = isLoginMode ? { username, password } : { username, email, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLoginMode) {
          login(data.user);
        } else {
          alert('Регистрация успешна! Теперь вы можете войти.');
        }
        setIsAuthModalOpen(false);
        e.currentTarget.reset();
      } else {
        setAuthError(data.error || 'Произошла ошибка');
      }
    } catch {
      // Убрали неиспользуемую переменную error
      setAuthError('Ошибка подключения к серверу');
    }
  };

  return { handleAuthSubmit };
}