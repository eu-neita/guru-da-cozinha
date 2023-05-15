import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfileHeader from '../../pages/Profile/ProfileHeader';
import { renderWithRouter } from '../../services/helpers/renderWith';
import Provider from '../../contexts/Provider';

test('renders page title', () => {
  renderWithRouter(<ProfileHeader />);
  const pageTitle = screen.getByTestId('page-title');
  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle).toHaveTextContent('Profile');
});

test('clicking profile button does not change URL', () => {
  const history = createMemoryHistory();
  renderWithRouter(
    <Router history={ history }>
      <Provider>
        <ProfileHeader />
      </Provider>
    </Router>,
  );
  const profileButton = screen.getByTestId('profile-top-btn');
  userEvent.click(profileButton);
  expect(history.location.pathname).toEqual('/profile');
});
