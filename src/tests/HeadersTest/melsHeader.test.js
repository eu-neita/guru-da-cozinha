import { screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import MealsHeader from '../../pages/Meals/MealsHeader';
import { renderWithRouter } from '../../services/helpers/renderWith';
import Provider from '../../contexts/Provider';

const searchInputva = 'search-input';

test('renders profile button that redirects to profile page', () => {
  const history = createMemoryHistory();
  renderWithRouter(
    <Router history={ history }>
      <Provider>
        <MealsHeader />
      </Provider>
    </Router>,
  );
  const profileButton = screen.getByTestId('profile-top-btn');
  expect(profileButton).toBeInTheDocument();

  userEvent.click(profileButton);

  expect(history.location.pathname).toBe('/profile');
});

describe('MealsHeader', () => {
  test('renders the page title', () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter>
          <MealsHeader />
        </MemoryRouter>
        ,
      </Provider>,
    );

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
  });

  test('renders the profile button', () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter>
          <MealsHeader />
        </MemoryRouter>
        ,
      </Provider>,
    );

    const profileBtn = screen.getByTestId('profile-top-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('alt', 'profile icon');
  });

  test('renders the search button', () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter>
          <MealsHeader />
        </MemoryRouter>
        ,
      </Provider>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');

    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).toHaveAttribute('alt', 'search icon');
  });

  test('does not render search input by default', () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter>
          <MealsHeader />
        </MemoryRouter>
        ,
      </Provider>,
    );

    expect(screen.queryByTestId(searchInputva)).not.toBeInTheDocument();
  });

  test('renders search input when search button is clicked', () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter>
          <MealsHeader />
        </MemoryRouter>
        ,
      </Provider>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');

    fireEvent.click(searchBtn);

    expect(screen.getByTestId(searchInputva)).toBeInTheDocument();
    expect(screen.getByTestId(searchInputva)).toHaveAttribute('type', 'text');
    expect(screen.getByTestId(searchInputva)).toHaveAttribute('name', 'searchInput');
  });
});
