import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';

const recipePhoto = 'recipe-photo';
const instruction = 'Put a large saucepan of water on to boil.';
describe('RecipeInProgress', () => {
  test('renders recipe photo, title, share and favorite buttons, category, instructions and ingredients checkboxes', async () => {
    const recipeData = {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strCategory: 'Vegetarian',
      strInstructions: instruction,
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      strIngredient1: 'penne rigate',
      strMeasure1: '1 pound',
      strIngredient2: 'olive oil',
      strMeasure2: '1/4 cup',
      strIngredient3: 'garlic',
      strMeasure3: '3 cloves',
      strIngredient4: 'chopped tomatoes',
      strMeasure4: '1 tin',
      strIngredient5: 'red pepper flakes',
      strMeasure5: '1/2 teaspoon',
      strIngredient6: 'italian seasoning',
      strMeasure6: '1 tablespoon',
      strIngredient7: 'basil',
      strMeasure7: '1 handful',
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [recipeData],
      }),
    });

    render(
      <MemoryRouter initialEntries={ [`/meals/${recipeData.idMeal}/in-progress`] }>
        <Route path="/meals/:id/in-progress">
          <RecipeInProgress />
        </Route>
      </MemoryRouter>,
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeData.idMeal}`,
    );

    await screen.findByTestId(recipePhoto);
    expect(screen.getByTestId(recipePhoto)).toHaveAttribute(
      'src',
      recipeData.strMealThumb,
    );
    expect(screen.getByTestId('recipe-title')).toHaveTextContent(recipeData.strMeal);
    expect(screen.getByTestId('recipe-category')).toHaveTextContent(
      recipeData.strCategory,
    );
    expect(screen.getByTestId('instructions')).toHaveTextContent(instruction);

    global.fetch.mockRestore();
  });

  test('renders drink recipe when URL includes /drinks/', async () => {
    const recipeData = {
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strCategory: 'Cocktail',
      strInstructions:
        'Pour vodka, blue curacao and lemon juice into a cocktail shaker.',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      strIngredient1: 'Vodka',
      strMeasure1: '2 oz ',
      strIngredient2: 'Blue Curacao',
      strMeasure2: '1 oz ',
      strIngredient3: 'Lemon juice',
      strMeasure3: '1 oz ',
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [recipeData],
      }),
    });
    // const { getByTestId, history } = renderWithRouter(<RecipeInProgress />, {
    //   route: `/comidas/${recipeData.idDrink}`,
    // });
    render(
      <MemoryRouter initialEntries={ [`/drinks/${recipeData.idDrink}/in-progress`] }>
        <Route path="/drinks/:id/in-progress">
          <RecipeInProgress />
        </Route>
      </MemoryRouter>,
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeData.idDrink}`,
    );

    await screen.findByTestId(recipePhoto);
    expect(screen.getByTestId(recipePhoto)).toHaveAttribute(
      'src',
      recipeData.strDrinkThumb,
    );
    expect(screen.getByTestId('recipe-title')).toHaveTextContent(recipeData.idDrink);
    expect(screen.getByTestId('recipe-category')).toHaveTextContent(
      recipeData.strCategory,
    );
    expect(screen.getByTestId('instructions')).toHaveTextContent('Put a large saucepan of water on to boil.');

    global.fetch.mockRestore();
  });
});
