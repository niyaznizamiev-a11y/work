import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Test Modal',
    children: <div data-testid="modal-content">Modal content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with title and children when open', () => {
    render(<Modal {...defaultProps} />);

    // Вместо role="dialog" используем data-testid для основного контейнера
    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    // Мокаем addEventListener и removeEventListener для тестирования Escape
    const addEventListenerMock = jest.spyOn(document, 'addEventListener');
    const removeEventListenerMock = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<Modal {...defaultProps} />);

    // Проверяем что обработчик был добавлен
    expect(addEventListenerMock).toHaveBeenCalledWith('keydown', expect.any(Function));

    // Симулируем нажатие Escape
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(mockOnClose).toHaveBeenCalledTimes(1);

    // Проверяем что обработчик удаляется при размонтировании
    unmount();
    expect(removeEventListenerMock).toHaveBeenCalledWith('keydown', expect.any(Function));

    // Восстанавливаем оригинальные методы
    addEventListenerMock.mockRestore();
    removeEventListenerMock.mockRestore();
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<Modal {...defaultProps} />);

    const backdrop = screen.getByTestId('modal-backdrop');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByTestId('modal-content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when title is clicked', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByText('Test Modal'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders with correct CSS classes', () => {
    render(<Modal {...defaultProps} />);

    const backdrop = screen.getByTestId('modal-backdrop');
    expect(backdrop).toHaveClass('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50', 'p-4');
    
    const modalContent = screen.getByText('Test Modal').closest('.bg-white');
    expect(modalContent).toHaveClass('bg-white', 'rounded-lg', 'max-w-md', 'w-full', 'p-6', 'relative', 'max-h-[90vh]', 'overflow-y-auto');
  });

  it('renders close button with correct attributes', () => {
    render(<Modal {...defaultProps} />);

    const closeButton = screen.getByText('×');
    expect(closeButton).toHaveClass('absolute', 'top-4', 'right-4', 'text-gray-500', 'hover:text-gray-700', 'text-2xl', 'z-10');
  });

  it('renders title with correct styling', () => {
    render(<Modal {...defaultProps} />);

    const title = screen.getByText('Test Modal');
    expect(title).toHaveClass('text-2xl', 'font-bold', 'text-blue-900', 'mb-6', 'pr-8');
  });
});