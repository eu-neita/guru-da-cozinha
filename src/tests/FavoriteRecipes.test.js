import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';

import App from '../App';

const fakeFavoriteRecipe = {
  id: '11111',
  type: 'meal',
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
  it('Deve mostar "Link copied!" quando o botão de compartilhar receita for clicado', () => {
    const fakeFavoriteRecipes = [fakeFavoriteRecipe];
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
});
