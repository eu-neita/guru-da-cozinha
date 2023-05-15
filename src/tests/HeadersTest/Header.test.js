import React from 'react';
// import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { renderWithRouter } from '../../services/helpers/renderWith';
import Provider from '../../contexts/Provider';

const profileBtn = 'profile-top-btn';
describe('Header component', () => {
  test('renders HomeHeader when pathname is /', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders MealsHeader when pathname is /meals', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/meals'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders DrinksHeader when pathname is /drinks', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/drinks'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders ProfileHeader when pathname is /profile', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/profile'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders DoneRecipesHeader when pathname is /done-recipes', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/done-recipes'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders FavoriteRecipesHeader when pathname is /favorite-recipes', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes :id-da-receita', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/meals/:id-da-receita'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes drinks/:id-da-receita', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/drinks/:id-da-receita'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes meals/:id-da-receita', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/meals/:id-da-receita'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes meals/:id-da-receita', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/meals/:id-da-receita/in-progress'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes drinks/:id-da-receita', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={ ['/drinks/:id-da-receita/in-progress'] }>
          <Header />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });
});
