import { screen, fireEvent, wait } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DrinksHeader from '../../pages/Drinks/DrinksHeader';
import { renderWithRouter } from '../../services/helpers/renderWith';
import Provider from '../../contexts/Provider';

describe('DrinksHeader', () => {
  test('renders DrinksHeader correctly', async () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <MemoryRouter>
          <DrinksHeader />
        </MemoryRouter>
      </Provider>,
    );
    // render(
    //   <MemoryRouter>
    //     <DrinksHeader />
    //   </MemoryRouter>,
    // );

    await wait(expect(getByTestId('page-title')).toHaveTextContent('Drinks'));
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });

  test('clicking profile icon should push to profile page', () => {
    const value = 1;
    const historyMock = { push: jest.fn() };
    jest.spyOn(historyMock, 'push');
    jest.spyOn(value, 'useHistory').mockReturnValue(historyMock);

    renderWithRouter(
      <Provider>
        <MemoryRouter>
          <DrinksHeader />
        </MemoryRouter>
        ,
      </Provider>,
    );

    const profileBtn = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileBtn);

    expect(historyMock.push).toHaveBeenCalledWith('/profile');
  });

  test('search input should be hidden by default', () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter>
          <DrinksHeader />
        </MemoryRouter>
        ,

      </Provider>,
    );

    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();
  });

  test('clicking search icon should toggle search input visibility', () => {
    renderWithRouter(
      <Provider>
        <MemoryRouter>
          <DrinksHeader />
        </MemoryRouter>
        ,

      </Provider>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    fireEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
