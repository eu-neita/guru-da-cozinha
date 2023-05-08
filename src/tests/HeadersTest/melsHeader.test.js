import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import MealsHeader from '../../pages/Meals/MealsHeader';

const searchInputva = 'search-input';

test('renders profile button that redirects to profile page', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <MealsHeader />
    </Router>,
  );
  const profileButton = screen.getByTestId('profile-top-btn');
  expect(profileButton).toBeInTheDocument();

  userEvent.click(profileButton);

  expect(history.location.pathname).toBe('/profile');
});

describe('MealsHeader', () => {
  test('renders the page title', () => {
    render(
      <MemoryRouter>
        <MealsHeader />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toHaveTextContent('Meals');
  });

  test('renders the profile button', () => {
    render(
      <MemoryRouter>
        <MealsHeader />
      </MemoryRouter>,
    );

    const profileBtn = screen.getByTestId('profile-top-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('alt', 'profile icon');
  });

  test('renders the search button', () => {
    render(
      <MemoryRouter>
        <MealsHeader />
      </MemoryRouter>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');

    expect(searchBtn).toBeInTheDocument();
    expect(searchBtn).toHaveAttribute('alt', 'search icon');
  });

  test('does not render search input by default', () => {
    render(
      <MemoryRouter>
        <MealsHeader />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId(searchInputva)).not.toBeInTheDocument();
  });

  test('renders search input when search button is clicked', () => {
    render(
      <MemoryRouter>
        <MealsHeader />
      </MemoryRouter>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');

    fireEvent.click(searchBtn);

    expect(screen.getByTestId(searchInputva)).toBeInTheDocument();
    expect(screen.getByTestId(searchInputva)).toHaveAttribute('type', 'text');
    expect(screen.getByTestId(searchInputva)).toHaveAttribute('name', 'searchInput');
  });
});
