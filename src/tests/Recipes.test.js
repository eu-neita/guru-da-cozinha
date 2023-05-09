import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import mockMeals from './mock/mockMeals';
import Meals from '../pages/Meals';
import mockDrinks from './mock/mockDrinks';
import Drinks from '../pages/Drinks';

describe('Recipes component', () => {
  describe('Meals', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => (mockMeals),
      });
    });

    it('Teste se fetch é chamado', async () => {
      act(() => {
        render(<Meals />);
      });

      expect(fetch).toHaveBeenCalled();
    });

    it('Teste se os componentes são renderizados na pagina Meals', async () => {
      act(() => {
        render(<Meals />);
      });

      await waitFor(() => {
        const corba = screen.getByRole('heading', { name: /corba/i });
        expect(corba).toBeInTheDocument();
      });
    });
  });

  describe('Drinks', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: async () => (mockDrinks),
      });
    });

    it('Teste se fetch é chamado', async () => {
      act(() => {
        render(<Drinks />);
      });

      expect(fetch).toHaveBeenCalled();
    });

    it('Teste se os componentes são renderizados na pagina Drinks', async () => {
      act(() => {
        render(<Drinks />);
      });

      await waitFor(() => {
        const gg = screen.getByRole('heading', { name: /gg/i });
        expect(gg).toBeInTheDocument();
      });
    });
  });
});
