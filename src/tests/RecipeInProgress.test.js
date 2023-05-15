import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RecipeInProgress from '../components/RecipeInProgress';

const recipePhoto = 'recipe-photo';
const instruction = 'Put a large saucepan of water on to boil.';
const ingredientStep = '0-ingredient-step';
const ingredientStep1 = '1-ingredient-step';
const ingredientStep2 = '2-ingredient-step';
// const ingredientStep3 = '3-ingredient-step';
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
    const clipboard = { writeText: jest.fn() };
    Object.assign(navigator, { clipboard });
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

    expect(screen.getByTestId(ingredientStep)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientStep))
      .toHaveTextContent(recipeData.strIngredient1);
    expect(screen.getByTestId(ingredientStep1)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientStep1))
      .toHaveTextContent(recipeData.strIngredient2);
    expect(screen.getByTestId(ingredientStep2)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientStep2))
      .toHaveTextContent(recipeData.strIngredient3);

    global.fetch.mockRestore();
    const shareBtn = screen.getByTestId('share-btn');
    // const spanText = screen.getByText('Link copied!');
    fireEvent.click(shareBtn);

    waitFor(() => {
      expect(clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
    });
  });

  test('renders recipe photo, title, share and favorite buttons, category, instructions and ingredients checkboxes', async () => {
    const recipeData = {
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strCategory: 'Cocktail',
      strInstructions: 'Pour vodka, blue curacao and lemon juice into a cocktail shaker.',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      strIngredient1: 'Vodka',
      strMeasure1: '2 oz',
      strIngredient2: 'Blue Curacao',
      strMeasure2: '1 oz',
      strIngredient3: 'Lemon juice',
      strMeasure3: '1 oz',
    };
    const clipboard = { writeText: jest.fn() };
    Object.assign(navigator, { clipboard });
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: [recipeData],
      }),
    });

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
    expect(screen.getByTestId('recipe-title')).toHaveTextContent(recipeData.strDrink);
    expect(screen.getByTestId('recipe-category')).toHaveTextContent(
      recipeData.strCategory,
    );
    expect(screen.getByTestId('instructions')).toHaveTextContent(
      recipeData.strInstructions,
    );

    // Check if ingredient checkboxes are rendered correctly
    expect(screen.getByTestId(ingredientStep)).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-step')).toHaveTextContent(recipeData.strIngredient1);
    expect(screen.getByTestId(ingredientStep1)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientStep1))
      .toHaveTextContent(recipeData.strIngredient2);
    expect(screen.getByTestId(ingredientStep2)).toBeInTheDocument();
    expect(screen.getByTestId(ingredientStep2))
      .toHaveTextContent(recipeData.strIngredient3);

    global.fetch.mockRestore();
    const shareBtn = screen.getByTestId('share-btn');
    fireEvent.click(shareBtn);

    waitFor(() => {
      expect(clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
    });
  });

  it('should render ingredients checkboxes', async () => {
    const recipe = [
      {
        strMeal: 'Pasta',
        strIngredient1: 'Ingredient 1',
        strIngredient2: 'Ingredient 2',
      },
      {
        strMeal: 'Curry',
        strIngredient1: 'Ingredient 3',
        strIngredient2: 'Ingredient 4',
      },
    ];

    render(
      <MemoryRouter initialEntries={ ['/recipe/in-progress/52771'] }>
        <Route path="/recipe/in-progress/:id">
          <RecipeInProgress recipe={ recipe } />
        </Route>
      </MemoryRouter>,
    );

    // Verifica se os checkboxes foram renderizados
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(8);

    // Simula o clique no primeiro checkbox
    fireEvent.click(checkboxes[0]);
    expect(localStorage.getItem('checkedIngredients')).toBe('[0]');
    expect(checkboxes[0]).toBeChecked();
    fireEvent.click(checkboxes[0]);
    // Check if the checkbox is unchecked
    await waitFor(() => {
      expect(checkboxes[0].checked).toBe(false);
      expect(localStorage.getItem('checkedIngredients')).toBe('[]');
    });

    // Simula o clique no segundo checkbox
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
    expect(localStorage.getItem('checkedIngredients')).toBe('[1]');
    fireEvent.click(checkboxes[1]);

    // Check if the checkbox is unchecked
    await waitFor(() => {
      expect(checkboxes[1].checked).toBe(false);
      expect(localStorage.getItem('checkedIngredients')).toBe('[]');
    });

    // Simula o clique no terceiro checkbox
    fireEvent.click(checkboxes[2]);
    expect(checkboxes[2]).toBeChecked();
    expect(localStorage.getItem('checkedIngredients')).toBe('[2]');
    fireEvent.click(checkboxes[2]);

    // Check if the checkbox is unchecked
    await waitFor(() => {
      expect(checkboxes[2].checked).toBe(false);
      expect(localStorage.getItem('checkedIngredients')).toBe('[]');
    });

    // Simula o clique no quarto checkbox
    fireEvent.click(checkboxes[3]);
    expect(checkboxes[3]).toBeChecked();
    expect(localStorage.getItem('checkedIngredients')).toBe('[3]');
    fireEvent.click(checkboxes[3]);

    // Check if the checkbox is unchecked
    await waitFor(() => {
      expect(localStorage.getItem('checkedIngredients')).toBe('[]');
      expect(checkboxes[3].checked).toBe(false);
    });
  });
  const inputCheck = 'input[type="checkbox"]';
  const finishRecipeBtn = 'finish-recipe-btn';
  it('should save finished recipe to localStorage and redirect to done-recipes page', () => {
    const recipe = [
      {
        idMeal: '1',
        strMeal: 'Spaghetti',
        strMealThumb: 'https://www.example.com/spaghetti.jpg',
        strArea: 'Italian',
        strCategory: 'Pasta',
        strTags: 'Italian, Dinner',
        strInstructions: 'Cook the spaghetti...',
        strIngredient1: 'Spaghetti',
        strIngredient2: 'Tomato Sauce',
        strIngredient3: 'Ground Beef',
        strIngredient4: '',
        strIngredient5: '',
        strIngredient6: '',
        strIngredient7: '',
        strIngredient8: '',
        strIngredient9: '',
        strIngredient10: '',
      },
    ];
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <RecipeInProgress recipe={ recipe } />
      </Router>,
    );

    // Simulate checking all ingredients
    const checkboxes = document.querySelectorAll(inputCheck);
    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    // Simulate clicking on "Finish Recipe" button
    const finishButton = getByTestId(finishRecipeBtn);
    fireEvent.click(finishButton);

    // Verify if recipe was saved to localStorage
    waitFor(() => {
      const expectedRecipe = {
        id: '1',
        type: 'meal',
        nationality: 'Italian',
        category: 'Pasta',
        alcoholicOrNot: '',
        name: 'Spaghetti',
        image: 'https://www.example.com/spaghetti.jpg',
        doneDate: expect.any(String),
        tags: ['Italian', ' Dinner'],
      };

      expect(JSON.parse(localStorage.getItem('doneRecipes'))).toContainEqual(expectedRecipe);
    });

    // Verify if localStorage checkedIngredients was reset
    waitFor(() => {
      expect(localStorage.getItem('checkedIngredients')).toBe(null);
    });

    // Verify if the page was redirected to "/done-recipes"
    waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    });
  });
  const LINK_MARGUE = 'https://www.example.com/margarita.jpg';
  it('should save finished cocktail to localStorage and redirect to done-drinks page', () => {
    const recipe = [{ idDrink: '1',
      strDrink: 'Margarita',
      strDrinkThumb: LINK_MARGUE,
      strCategory: 'Cocktail',
      strAlcoholic: 'Alcoholic',
      strInstructions: 'Mix the ingredients...',
      strIngredient1: 'Tequila',
      strIngredient2: 'Lime Juice',
      strIngredient3: 'Triple Sec',
      strIngredient4: 'Salt',
      strIngredient5: '',
      strIngredient6: '',
      strIngredient7: '',
      strIngredient8: '',
      strIngredient9: '',
      strIngredient10: '' }];
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <RecipeInProgress recipe={ recipe } />
      </Router>,
    );

    // Simulate checking all ingredients
    const checkboxes = document.querySelectorAll(inputCheck);
    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    // Simulate clicking on "Finish Cocktail" button
    const finishButton = getByTestId(finishRecipeBtn);
    fireEvent.click(finishButton);

    // Verify if cocktail was saved to localStorage
    waitFor(() => {
      const expectedCocktail = {
        id: '1',
        type: 'cocktail',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Margarita',
        image: LINK_MARGUE,
        doneDate: expect.any(String),
        tags: [],
      };

      expect(JSON.parse(localStorage.getItem('doneDrinks'))).toContainEqual(expectedCocktail);
    });

    // Verify if localStorage checkedIngredients was reset
    waitFor(() => {
      expect(localStorage.getItem('checkedIngredients')).toBe(null);
    });

    // Verify if the page was redirected to "/done-drinks"
    waitFor(() => {
      expect(history.location.pathname).toBe('/done-drinks');
    });
  });

  test('should return an object with properties of drink', () => {
    const recipe = [
      {
        idDrink: '1',
        strDrink: 'Margarita',
        strDrinkThumb: LINK_MARGUE,
        strCategory: 'Cocktail',
        strAlcoholic: 'Alcoholic',
        strTags: 'Tequila, Lime',
        strInstructions: 'Shake the tequila...',
        strIngredient1: 'Tequila',
        strIngredient2: 'Lime Juice',
        strIngredient3: 'Triple Sec',
        strIngredient4: '',
        strIngredient5: '',
        strIngredient6: '',
        strIngredient7: '',
        strIngredient8: '',
        strIngredient9: '',
        strIngredient10: '',
      },
    ];
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <RecipeInProgress recipe={ recipe } />
      </Router>,
    );

    // Simulate checking all ingredients
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    // Simulate clicking on "Finish Recipe" button
    const finishButton = getByTestId('finish-recipe-btn');
    fireEvent.click(finishButton);

    waitFor(() => {
      const expectedRecipe = {
        id: '1',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Margarita',
        image: LINK_MARGUE,
      };

      expect(JSON.parse(localStorage.getItem('doneRecipes'))).toContainEqual(expectedRecipe);
    });
    // Verify if the page was redirected to "/done-recipes"
    waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    });
  });
});

describe('RecipeInProgress', () => {
  it('should toggle favorite icon when clicked', () => {
    const handleCheckBox = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ ['/meals/52771/in-progress'] }>
        <Route path="/meals/52771/in-progress">
          <RecipeInProgress handleCheckBox={ handleCheckBox } />
        </Route>
      </MemoryRouter>,
    );
    const favoriteBtn = getByTestId('favorite-btn');

    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');

    fireEvent.click(favoriteBtn);

    // Verify if favorite icon is toggled to blackHeartIcon
    waitFor(() => {
      expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    });

    // Verify if recipe was added to localStorage
    waitFor(() => {
      const expectedRecipe = {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      };

      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toContainEqual(expectedRecipe);
    });

    fireEvent.click(favoriteBtn);

    // Verify if favorite icon is toggled back to whiteHeartIcon
    waitFor(() => {
      expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
    });

    // Verify if recipe was removed from localStorage
    waitFor(() => {
      expect(localStorage.getItem('favoriteRecipes')).toEqual('[]');
    });
  });
});
