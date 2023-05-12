import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import { renderWithRouter } from '../services/helpers/renderWith';

describe('Recipes component', () => {
  describe('Meals', () => {
    test('Teste se os componentes são renderizados na pagina Meals', async () => {
      renderWithRouter(<Meals />);

      await waitFor(() => {
        const corba = screen.getByRole('heading', { name: /corba/i });
        expect(corba).toBeInTheDocument();

        const beef = screen.getByRole('button', { name: /beef/i });
        expect(beef).toBeInTheDocument();
      });
    });

    test('Teste os filtros na pagina Meals', async () => {
      renderWithRouter(<Meals />);

      await waitFor(() => {
        const beef = screen.getByRole('button', { name: /beef/i });
        userEvent.click(beef);
      });
      await waitFor(() => {
        const recipeBeef = screen.getByRole('heading', { name: /beef and mustard pie/i });
        expect(recipeBeef).toBeInTheDocument();
      });
      await waitFor(() => {
        const breakfast = screen.getByRole('button', { name: /breakfast/i });
        userEvent.click(breakfast);
      });
      await waitFor(() => {
        const recipeBreakfast = screen.getByRole('heading', { name: /breakfast potatoes/i });
        expect(recipeBreakfast).toBeInTheDocument();
      });
      await waitFor(() => {
        const all = screen.getByRole('button', { name: /all/i });
        userEvent.click(all);
      });
      await waitFor(() => {
        const corba = screen.getByRole('heading', { name: /corba/i });
        expect(corba).toBeInTheDocument();
        const sushi = screen.getByRole('heading', { name: /sushi/i });
        expect(sushi).toBeInTheDocument();
      });
    });
  });

  describe('Drinks', () => {
    test('Teste se os componentes são renderizados na pagina Drinks', async () => {
      renderWithRouter(<Drinks />);

      await waitFor(() => {
        const gg = screen.getByRole('heading', { name: /gg/i });
        expect(gg).toBeInTheDocument();

        const ordinary = screen.getByRole('button', { name: /ordinary drink/i });
        expect(ordinary).toBeInTheDocument();
      });
    });

    test('Teste os filtros na pagina Drinks', async () => {
      renderWithRouter(<Drinks />);

      await waitFor(() => {
        const cocoa = screen.getByRole('button', { name: /cocoa/i });
        userEvent.click(cocoa);
      });
      await waitFor(() => {
        const hotCocoa = screen.getByRole('heading', { name: /castillian hot chocolate/i });
        expect(hotCocoa).toBeInTheDocument();
      });
      await waitFor(() => {
        const shake = screen.getByRole('button', { name: /shake/i });
        userEvent.click(shake);
      });
      await waitFor(() => {
        const florida = screen.getByRole('heading', { name: /151 florida bushwacker/i });
        expect(florida).toBeInTheDocument();
      });
      await waitFor(() => {
        const all = screen.getByRole('button', { name: /all/i });
        userEvent.click(all);
      });
      await waitFor(() => {
        const gg = screen.getByRole('heading', { name: /gg/i });
        expect(gg).toBeInTheDocument();
        const kir = screen.getByRole('heading', { name: /kir/i });
        expect(kir).toBeInTheDocument();
      });
    });
  });
});
