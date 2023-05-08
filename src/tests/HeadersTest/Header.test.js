import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';

const profileBtn = 'profile-top-btn';
describe('Header component', () => {
  test('renders HomeHeader when pathname is /', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders MealsHeader when pathname is /meals', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders DrinksHeader when pathname is /drinks', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders ProfileHeader when pathname is /profile', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders DoneRecipesHeader when pathname is /done-recipes', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders FavoriteRecipesHeader when pathname is /favorite-recipes', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes :id-da-receita', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/meals/:id-da-receita'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes drinks/:id-da-receita', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/drinks/:id-da-receita'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes meals/:id-da-receita', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/meals/:id-da-receita'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes meals/:id-da-receita', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/meals/:id-da-receita/in-progress'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });

  test('renders HomeHeader when pathname includes drinks/:id-da-receita', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/drinks/:id-da-receita/in-progress'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(getByTestId(profileBtn)).toBeInTheDocument();
  });
});
