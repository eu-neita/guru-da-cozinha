import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Profile from '../pages/Profile';

const emailTest = 'test@test.com';

describe('Profile component', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    localStorage.setItem('user', JSON.stringify({ email: emailTest }));

    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    expect(getByTestId('profile-email')).toHaveTextContent(emailTest);
    expect(getByTestId('profile-done-btn')).toHaveTextContent('Done Recipes');
    expect(getByTestId('profile-favorite-btn')).toHaveTextContent('Favorite Recipes');
    expect(getByTestId('profile-logout-btn')).toHaveTextContent('Logout');
  });

  it('should redirect to "/" when clicking on logout button', () => {
    const history = createMemoryHistory();
    localStorage.setItem('user', JSON.stringify({ email: emailTest }));

    const { getByTestId } = render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    fireEvent.click(getByTestId('profile-logout-btn'));

    expect(history.location.pathname).toBe('/');
  });

  it('should redirect to "/" if user is not logged in', () => {
    const history = createMemoryHistory();
    localStorage.clear();

    render(
      <Router history={ history }>
        <Profile />
      </Router>,
    );

    expect(history.location.pathname).toBe('/');
  });
});
