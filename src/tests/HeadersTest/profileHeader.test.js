import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfileHeader from '../../pages/Profile/ProfileHeader';

test('renders page title', () => {
  render(<ProfileHeader />);
  const pageTitle = screen.getByTestId('page-title');
  expect(pageTitle).toBeInTheDocument();
  expect(pageTitle).toHaveTextContent('Profile');
});

test('clicking profile button does not change URL', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <ProfileHeader />
    </Router>,
  );
  const profileButton = screen.getByTestId('profile-top-btn');
  userEvent.click(profileButton);
  expect(history.location.pathname).toEqual('/profile');
});
