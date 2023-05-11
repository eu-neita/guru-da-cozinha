import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import App from '../App';

describe('Testa página Favorite Recipes', () => {
  it('Deve renderizar um botão "all"', () => {
    const history = createMemoryHistory({ initialEntries: ['/favorite-recipes'] });

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const allFilterButton = screen.getByTestId('filter-by-all-btn');

    expect(allFilterButton).toBeInTheDocument();
  });
});
