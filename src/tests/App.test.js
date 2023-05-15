import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../services/helpers/renderWith';
import App from '../App';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});
