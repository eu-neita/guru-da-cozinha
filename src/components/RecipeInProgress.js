import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import hartBtn from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (history.location.pathname.includes('drinks')) {
        const URL_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        const responseDrink = await fetch(URL_DRINKS);
        const dataDrink = await responseDrink.json();
        return setRecipe(dataDrink.drinks);
      }
      const URL_MEAL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(URL_MEAL);
      const data = await response.json();
      setRecipe(data.meals);
    };
    fetchRecipe();
    const filterIngredients = (minValue, maxValue) => {
      const ingredientsKey = recipe.length > 0
        ? Object.values(recipe[0])
          .filter((val, index) => index >= minValue && index <= maxValue)
          .filter((val) => val !== null && val !== '')
        : [];
      setIngredients(ingredientsKey);
    };
    if (history.location.pathname.includes('drinks')) {
      const minValue2 = 17;
      const maxValue2 = 31;
      filterIngredients(minValue2, maxValue2);
    } else {
      const minValue = 9;
      const maxValue = 28;
      filterIngredients(minValue, maxValue);
    }
  }, [history, id, recipe]);

  // console.log(recipe);
  console.log(ingredients);
  return (
    <div>
      {history.location.pathname.includes('meals')
        ? recipe.length > 0 && (
          <div>
            <img
              src={ recipe[0].strMealThumb }
              alt={ recipe[0].strMeal }
              data-testid="recipe-photo"
            />

            <span data-testid="recipe-title">{ recipe[0].strMeal }</span>

            <button
              data-testid="share-btn"
            >
              Share
            </button>

            <button data-testid="favorite-btn">
              <img src={ hartBtn } alt="favorite Icon" />
            </button>

            <span data-testid="recipe-category">{ recipe[0].strCategory }</span>
            <span data-testid="instructions">{ recipe[0].strInstructions }</span>
          </div>
        )
        : recipe.length > 0 && (
          <div>
            <img
              src={ recipe[0].strDrinkThumb }
              alt={ recipe[0].strDrink }
              data-testid="recipe-photo"
            />

            <span data-testid="recipe-title">{ recipe[0].strDrink }</span>

            <button
              data-testid="share-btn"
            >
              Share
            </button>

            <button data-testid="favorite-btn">
              <img src={ hartBtn } alt="favorite Icon" />
            </button>

            <span data-testid="recipe-category">{ recipe[0].strCategory }</span>
            <span data-testid="instructions">{ recipe[0].strInstructions }</span>
          </div>
        )}
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;

// 1a - fazer pegar os dados somente de uma receita com um id especifico

// 2 a - construir a tela com as informaçoes da receita em progresso;
