import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import HomeHeader from '../../pages/Home/HomeHeader';

const profileBtn = 'profile-top-btn';
// const pageTitleId = 'page-title';
// const titlesTest = ['should render the header with the correct title and button',
//   'should navigate to the profile page when button is clicked'];
// const textProfileIcons = 'profile icon';
const searchTopBtn = 'search-top-btn';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

describe('HomeHeader', () => {
  beforeEach(() => {
    useHistory.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders profile and search icons', () => {
    render(<HomeHeader />);
    const profileIcon = screen.getByTestId(profileBtn);
    const searchIcon = screen.getByTestId(searchTopBtn);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('renders search input when search icon is clicked', () => {
    render(<HomeHeader />);
    const searchIcon = screen.getByTestId(searchTopBtn);
    fireEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });

  it('redirects to profile page when profile icon is clicked', () => {
    render(<HomeHeader />);
    const profileIcon = screen.getByTestId(profileBtn);
    fireEvent.click(profileIcon);

    expect(useHistory().push).toHaveBeenCalledWith('/profile');
  });

  it('toggles search input when search icon is clicked twice', () => {
    render(<HomeHeader />);
    const searchIcon = screen.getByTestId('search-top-btn');
    fireEvent.click(searchIcon);
    fireEvent.click(searchIcon);
    const searchInput = screen.queryByTestId('search-input');

    expect(searchInput).toBeNull();
  });
});
