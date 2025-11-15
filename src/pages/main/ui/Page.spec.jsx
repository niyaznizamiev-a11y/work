/**
 * Тесты для главной страницы
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainPage } from './Page';

// Мокаем виджеты с относительными путями
jest.mock('../../../widgets/header/ui/Header', () => ({
  Header: () => <header data-testid="header">Header Widget</header>
}));

jest.mock('../../../widgets/navigation/ui/Navigation', () => ({
  Navigation: () => <nav data-testid="navigation">Navigation Widget</nav>
}));

jest.mock('../../../widgets/main-content/ui/MainContent', () => ({
  MainContent: () => <main data-testid="main-content">Main Content Widget</main>
}));

jest.mock('../../../widgets/auth-modal/ui/AuthModal', () => ({
  AuthModal: () => <div data-testid="auth-modal">Auth Modal Widget</div>
}));

jest.mock('../../../widgets/footer/ui/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer Widget</footer>
}));

describe('MAIN PAGE', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all main layout widgets', () => {
    render(<MainPage />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
  });

  it('should have correct page structure and semantic elements', () => {
    const { container } = render(<MainPage />);

    // Проверяем семантическую структуру
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('should have correct layout classes', () => {
    const { container } = render(<MainPage />);

    const pageContainer = container.firstChild;
    expect(pageContainer).toHaveClass('min-h-screen', 'bg-gray-50');
  });

  it('should render widgets in correct order', () => {
    render(<MainPage />);

    const testIds = ['header', 'navigation', 'main-content', 'footer'];
    const elements = testIds.map(id => screen.getByTestId(id));

    // Проверяем что элементы находятся в правильном порядке
    for (let i = 0; i < elements.length - 1; i++) {
      const currentElement = elements[i];
      const nextElement = elements[i + 1];
      
      // Проверяем что следующий элемент идет после текущего в DOM
      expect(currentElement.compareDocumentPosition(nextElement) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it('should render auth modal (usually hidden by default)', () => {
    render(<MainPage />);

    // AuthModal должен рендериться, даже если он скрыт
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
  });
});