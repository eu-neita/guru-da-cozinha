import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../services/helpers/renderWith';
import Provider from '../contexts/Provider';

import fakeFetch from '../../cypress/mocks/fetch';

import App from '../App';

const btnSearch = 'search-top-btn';
const schInput = 'search-input';
const execBtn = 'exec-search-btn';

describe('Testa componente SearchBar', () => {
  it('Verifica se o input-search é renderizado após o click no botão de pesquisa', () => {});

  it('Deve ser possível buscar as receitas de refeições por ingrediente', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fakeFetch);
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals'] },
    );
    const searchButton = screen.getByTestId(btnSearch);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(schInput);
    const execSearchButton = screen.getByTestId(execBtn);
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(ingredientSearchRadio);
    userEvent.click(execSearchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });

  it('Deve ser possível buscar as receitas de drinks por ingrediente', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fakeFetch);
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );
    const searchButton = screen.getByTestId(btnSearch);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(schInput);
    const execSearchButton = screen.getByTestId(execBtn);
    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.type(searchInput, 'Light rum');
    userEvent.click(ingredientSearchRadio);
    userEvent.click(execSearchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });

  it('Deve ser possível buscar as receitas por nome', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fakeFetch);
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/meals'] },
    );
    const searchButton = screen.getByTestId(btnSearch);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(schInput);
    const execSearchButton = screen.getByTestId(execBtn);
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    userEvent.type(searchInput, 'soup');
    userEvent.click(nameSearchRadio);
    userEvent.click(execSearchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  it('Deve ser possível buscar as drinks por nome', () => {
    jest.spyOn(global, 'fetch').mockImplementation(fakeFetch);
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      { initialEntries: ['/drinks'] },
    );
    const searchButton = screen.getByTestId(btnSearch);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId(schInput);
    const execSearchButton = screen.getByTestId(execBtn);
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(nameSearchRadio);
    userEvent.click(execSearchButton);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
  });

  // it('Verifica se o alert é disparado quando é digitado mais de uma letra na busca por first letter - drinks', () => {
  //   renderWithRouter(
  //     <Provider>
  //       <App />
  //     </Provider>,
  //     { initialEntries: ['/drinks'] },
  //   );

  //   userEvent.type(searchInput, 'aaa');
  //   userEvent.click(firstLetter);
  //   userEvent.click(button);
  //   expect(searchInput).toHaveTextContent('');
  // });

  // it('Verifica se o alert é disparado quando é digitado mais de uma letra na busca por first letter - meals', () => {
  //   renderWithRouter(
  //     <Provider>
  //       <App />
  //     </Provider>,
  //     { initialEntries: ['/meals'] },
  //   );
  //   userEvent.type(searchInput, 'aaa');
  //   userEvent.click(firstLetter);
  //   userEvent.click(button);
  //   expect(searchInput).toHaveTextContent('');
  // });
});
