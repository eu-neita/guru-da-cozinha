import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import DoneRecipesHeader from '../../pages/DoneRecipes/DoneRecipesHeader';
import DrinksHeader from '../../pages/Drinks/DrinksHeader';
import FavoriteRecipesHeader from '../../pages/FavoriteRecipes/FavoriteRecipesHeader';

const profileBtn = 'profile-top-btn';
const pageTitleId = 'page-title';
const titlesTest = ['should render the header with the correct title and button',
  'should navigate to the profile page when button is clicked'];
const textProfileIcons = 'profile icon';

describe('DoneRecipesHeader component', () => {
  test(titlesTest[0], () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <DoneRecipesHeader />
      </Router>,
    );

    const pageTitle = screen.getByTestId(pageTitleId);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Done Recipes');

    const button = screen.getByTestId(profileBtn);
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('IMG');
    expect(button.getAttribute('alt')).toBe(textProfileIcons);
  });

  test(titlesTest[1], () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <DoneRecipesHeader />
      </Router>,
    );

    const button = screen.getByTestId(profileBtn);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/profile');
  });
});

describe('DrinksHeader component', () => {
  test(titlesTest[0], () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <DrinksHeader />
      </Router>,
    );

    const pageTitle = screen.getByTestId(pageTitleId);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Drinks');

    const button = screen.getByTestId(profileBtn);
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('IMG');
    expect(button.getAttribute('alt')).toBe(textProfileIcons);
  });

  test(titlesTest[1], () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <DrinksHeader />
      </Router>,
    );

    const button = screen.getByTestId(profileBtn);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/profile');
  });
});

describe('FavoriteRecipesHeader component', () => {
  test(titlesTest[0], () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoriteRecipesHeader />
      </Router>,
    );

    const pageTitle = screen.getByTestId(pageTitleId);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Favorite Recipes');

    const button = screen.getByTestId(profileBtn);
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('IMG');
    expect(button.getAttribute('alt')).toBe(textProfileIcons);
  });

  test(titlesTest[1], () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoriteRecipesHeader />
      </Router>,
    );

    const button = screen.getByTestId(profileBtn);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/profile');
  });
});
