import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';

import App from '../App';

const fakeFavoriteMeal = {
  id: '11111',
  type: 'meal',
  nationality: 'Brazilian',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Nome da Receita',
  image: 'fakeImageUrl',
};

const fakeFavoriteDrink = {
  id: '11111',
  type: 'drink',
  nationality: 'Brazilian',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Nome da Receita',
  image: 'fakeImageUrl',
};

const favoriteRecipePathname = '/favorite-recipes';

jest.mock('clipboard-copy');

describe('Testa página Favorite Recipes', () => {
  it('Deve renderizar um botão "all"', () => {
    const history = createMemoryHistory({ initialEntries: [favoriteRecipePathname] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const allFilterButton = screen.getByTestId('filter-by-all-btn');

    expect(allFilterButton).toBeInTheDocument();
  });
  it('Deve ir para página de Profile quando o botão de perfil for clicado', () => {
    const history = createMemoryHistory({ initialEntries: [favoriteRecipePathname] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const profileButton = screen.getByTestId('profile-top-btn');

    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });
  it('Deve mostrar "Link copied!" quando o botão de compartilhar receita for clicado', () => {
    const fakeFavoriteRecipes = [fakeFavoriteDrink];
    const json = JSON.stringify(fakeFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', json);

    copy.mockImplementation(() => console.log('ok'));

    const history = createMemoryHistory({ initialEntries: [favoriteRecipePathname] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const shareButton = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(shareButton);

    const copyMessage = screen.getByText('Link copied!');

    expect(copyMessage).toBeInTheDocument();
  });

  it('Deve ser possível remover uma receita dos favoritos', () => {
    const fakeFavoriteRecipes = [fakeFavoriteMeal];
    const json = JSON.stringify(fakeFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', json);

    const history = createMemoryHistory({ initialEntries: [favoriteRecipePathname] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const unfavoriteButton = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(unfavoriteButton);

    const storagedFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );

    expect(storagedFavoriteRecipes).toHaveLength(0);
  });

  it('Deve ser possível filtrar as receitas favoritas', () => {
    const fakeFavoriteRecipes = [fakeFavoriteMeal];
    const json = JSON.stringify(fakeFavoriteRecipes);
    localStorage.setItem('favoriteRecipes', json);

    const history = createMemoryHistory({ initialEntries: [favoriteRecipePathname] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const filterAllRecipesButton = screen.getByTestId('filter-by-all-btn');

    userEvent.click(filterAllRecipesButton);

    const filterMealsRecipesButton = screen.getByTestId('filter-by-meal-btn');

    userEvent.click(filterMealsRecipesButton);

    const filterDrinksRecipesButton = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(filterDrinksRecipesButton);

    const recipeName = screen.queryByTestId('0-horizontal-name');

    expect(recipeName).not.toBeInTheDocument();
  });
});
