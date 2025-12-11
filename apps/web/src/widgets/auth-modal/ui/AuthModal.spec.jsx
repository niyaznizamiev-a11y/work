import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropTypes from 'prop-types';

// Компонент модального окна
const AuthModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" data-testid="auth-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button 
            onClick={onClose}
            className="close-button"
            data-testid="close-button"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Тесты
describe('AuthModal', () => {
  const mockOnClose = jest.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Test Modal',
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should render when isOpen is true', () => {
    render(<AuthModal {...defaultProps} />);
    
    expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(<AuthModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<AuthModal {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render with correct title', () => {
    render(<AuthModal {...defaultProps} title="Login Form" />);
    
    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });
});

export default AuthModal;