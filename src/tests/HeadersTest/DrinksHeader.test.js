import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DrinksHeader from '../../pages/Drinks/DrinksHeader';

describe('DrinksHeader', () => {
  test('renders DrinksHeader correctly', () => {
    render(
      <MemoryRouter>
        <DrinksHeader />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('page-title')).toHaveTextContent('Drinks');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  test('clicking profile icon should push to profile page', () => {
    const historyMock = { push: jest.fn() };
    jest.spyOn(historyMock, 'push');
    jest.spyOn(1, 'useHistory').mockReturnValue(historyMock);

    render(
      <MemoryRouter>
        <DrinksHeader />
      </MemoryRouter>,
    );

    const profileBtn = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileBtn);

    expect(historyMock.push).toHaveBeenCalledWith('/profile');
  });

  test('search input should be hidden by default', () => {
    render(
      <MemoryRouter>
        <DrinksHeader />
      </MemoryRouter>,
    );

    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();
  });

  test('clicking search icon should toggle search input visibility', () => {
    render(
      <MemoryRouter>
        <DrinksHeader />
      </MemoryRouter>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    fireEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
