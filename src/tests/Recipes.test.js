import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

describe('Recipes component', () => {
  describe('Meals', () => {
    test('Teste se os componentes são renderizados na pagina Meals', async () => {
      render(<Meals />);

      await waitFor(() => {
        const corba = screen.getByRole('heading', { name: /corba/i });
        expect(corba).toBeInTheDocument();
      });
    });
  });

  describe('Drinks', () => {
    test('Teste se os componentes são renderizados na pagina Drinks', async () => {
      render(<Drinks />);

      await waitFor(() => {
        const gg = screen.getByRole('heading', { name: /gg/i });
        expect(gg).toBeInTheDocument();
      });
    });
  });
});
