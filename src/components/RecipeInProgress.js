import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import hartBtn from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [ingredientsAll, setIngredientsAll] = useState([]);

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
    const ingredients = {};
    if (recipe.length > 0) {
      Object.keys(recipe[0]).forEach((key) => {
        if (key.startsWith('strIngredient') && recipe[0][key] !== null
        && recipe[0][key] !== '') {
          const ingredientNum = key.replace('strIngredient', '');
          const ingredientN = `strIngredient${ingredientNum}`;
          ingredients[recipe[0][ingredientN]] = recipe[0][`strMeasure${ingredientNum}`];
        }
      });
    }
    setIngredientsAll(ingredients);
  }, [history, id, recipe]);
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
            {Object.keys(ingredientsAll).map((ingedient, ind) => (
              <label
                data-testid={ `${ind}-ingredient-step` }
                htmlFor={ ind }
                key={ ind }
              >
                <input type="checkbox" id={ ind } />
                {ingedient}
              </label>
            ))}
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
            {Object.keys(ingredientsAll).map((ingedient, ind) => (
              <label
                data-testid={ `${ind}-ingredient-step` }
                htmlFor={ ind }
                key={ ind }
              >
                <input type="checkbox" id={ ind } />
                {ingedient}
              </label>
            ))}
          </div>
        )}
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;

// 1a - fazer pegar os dados somente de uma receita com um id especifico

// 2 a - construir a tela com as informaçoes da receita em progresso;
