import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../services/helpers/renderWith';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import Profile from '../pages/Profile';
import App from '../App';
import Provider from '../contexts/Provider';

describe('testa component Footer', () => {
  test('testa se footer aparece na pagina Drinks', () => {
    renderWithRouter(
      <Provider>
        <Drinks />
      </Provider>,
    );
    const buttonDrinks = screen.getByRole('button', { name: /drinks icon/i });
    const buttonMeals = screen.getByRole('button', { name: /meals icon/i });
    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
  });
  test('testa se footer aparece na pagina Meals', () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const buttonDrinks = screen.getByRole('button', { name: /drinks icon/i });
    const buttonMeals = screen.getByRole('button', { name: /meals icon/i });
    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
  });
  test('testa se footer aparece na pagina Profile', () => {
    renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );

    const buttonDrinks = screen.getByRole('button', { name: /drinks icon/i });
    const buttonMeals = screen.getByRole('button', { name: /meals icon/i });
    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
  });
  // test('testa se ao clicar no botão com icone de garfo vai para pagina meals', () => {
  //   render(<DoneRecipes />);
  //   expect(screen.getByRole('button', { name: /drinks icon/i })).not.toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /meals icon/i })).not.toBeInTheDocument();
  // });
});

describe('testa se ao clicar em um dos botoẽs é redirecionado para pagina certa', () => {
  test('teste se a partir da pagina drinks ao clicar no botão meals icon ele muda para pagina Meals', async () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/drinks'] }>
          <App />
        </MemoryRouter>
        ,

      </Provider>,
    );
    const buttonMeals = screen.getByRole('button', { name: /meals icon/i });
    expect(buttonMeals).toBeInTheDocument();
    userEvent.click(buttonMeals);
    const text = await screen.findByText('Meals');
    expect(text).toBeInTheDocument();
  });
  test('teste se a partir da pagina drinks ao clicar no botão meals icon ele muda para pagina Meals', async () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/meals'] }>
          <App />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const buttonDrinks = screen.getByRole('button', { name: /drinks icon/i });
    expect(buttonDrinks).toBeInTheDocument();
    userEvent.click(buttonDrinks);
    const text = await screen.findByText('Drinks');
    expect(text).toBeInTheDocument();
  });
});
