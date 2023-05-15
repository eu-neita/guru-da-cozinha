import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../services/helpers/renderWith';

import fakeFetch from '../../cypress/mocks/fetch';

import App from '../App';

describe('Testa componente SearchBar', () => {
  it('Deve ser possível buscar as receitas por ingrediente', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fakeFetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Chicken');
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientSearchRadio);
    const execSearchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(execSearchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
  it('Deve ser possível buscar as receitas por nome', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fakeFetch);
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Aquamarine');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearchRadio);
    const execSearchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(execSearchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
  });
});
