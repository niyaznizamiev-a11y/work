import React from 'react';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

// Ваш компонент провайдера
const AppProviders = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

// Тест
describe('AppProviders', () => {
  it('should render children', () => {
    const { getByText } = render(
      <AppProviders>
        <div>Test Child</div>
      </AppProviders>
    );
    
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});

export default AppProviders;