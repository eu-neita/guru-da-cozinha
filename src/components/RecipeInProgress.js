import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/recipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [ingredientsAll, setIngredientsAll] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState(
    JSON.parse(localStorage.getItem('checkedIngredients')) || [],
  );
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
  const handleCheckBox = (ingredientIndex) => {
    const isChecked = checkedIngredients.includes(ingredientIndex);
    if (isChecked) {
      setCheckedIngredients(checkedIngredients
        .filter((index) => index !== ingredientIndex));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredientIndex]);
    }
  };
  const [copiedIsTrue, setCopiedIsTrue] = useState(false);
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href.replace('/in-progress', ''));
    setCopiedIsTrue(true);
  };
  const handleFavoriteBtn = () => {
    const mealOrDrink = recipe[0].strMeal !== undefined ? 'meal' : 'drink';
    const newObj = {
      id: recipe[0].idMeal || recipe[0].idDrink,
      type: mealOrDrink,
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory,
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strDrink || recipe[0].strMeal,
      image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
    };
    if (heartIcon === whiteHeartIcon) {
      setHeartIcon(blackHeartIcon);
    } else {
      setHeartIcon(whiteHeartIcon);
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.some((obj) => obj.id === id)) {
      const updateFavoriteRecipes = favoriteRecipes.filter((obj) => obj.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavoriteRecipes));
    } else {
      favoriteRecipes.push(newObj);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
  };
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.some((obj) => obj.id === id)) {
      setHeartIcon(blackHeartIcon);
    }
    localStorage.setItem('checkedIngredients', JSON.stringify(checkedIngredients));
  }, [checkedIngredients, id]);
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

            <span data-testid="recipe-category">{ recipe[0].strCategory }</span>
            <span data-testid="instructions">{ recipe[0].strInstructions }</span>
            {Object.keys(ingredientsAll).map((ingredient, index) => (
              <label
                key={ index }
                htmlFor={ index }
                data-testid={ `${index}-ingredient-step` }
                className={ checkedIngredients.includes(index) ? 'checked' : '' }
              >
                <input
                  type="checkbox"
                  id={ index }
                  checked={ checkedIngredients.includes(index) }
                  onChange={ () => handleCheckBox(index) }
                />
                {ingredient}
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
            <span data-testid="recipe-category">{ recipe[0].strCategory }</span>
            <span data-testid="instructions">{ recipe[0].strInstructions }</span>
            {Object.keys(ingredientsAll).map((ingredient, index) => (
              <label
                key={ index }
                htmlFor={ index }
                data-testid={ `${index}-ingredient-step` }
                className={ checkedIngredients.includes(index) ? 'checked' : '' }
              >
                <input
                  type="checkbox"
                  id={ index }
                  checked={ checkedIngredients.includes(index) }
                  onChange={ () => handleCheckBox(index) }
                />
                {ingredient}
              </label>
            ))}
          </div>
        )}

      <button onClick={ handleFavoriteBtn }>
        <img
          src={ heartIcon }
          data-testid="favorite-btn"
          alt="blackHeartIcon"
        />
      </button>
      <button
        data-testid="share-btn"
        onClick={ handleCopyLink }
      >
        Share
      </button>
      {copiedIsTrue && <span>Link copied!</span>}
      <button
        data-testid="finish-recipe-btn"
        disabled={ checkedIngredients.length !== Object.keys(ingredientsAll).length }
        onClick={ () => {
          const mealOrDrink = recipe[0].strMeal !== undefined ? 'meal' : 'drink';
          const now = new Date().toISOString();
          const newObjRecipe = {
            id: recipe[0].idMeal || recipe[0].idDrink,
            type: mealOrDrink,
            doneDate: now,
            nationality: recipe[0].strArea || '',
            category: recipe[0].strCategory,
            alcoholicOrNot: recipe[0].strAlcoholic || '',
            name: recipe[0].strDrink || recipe[0].strMeal,
            image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
            tags: recipe[0].strTags !== null ? recipe[0].strTags.split(',') : [],
          };
          const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
          doneRecipes.push(newObjRecipe);
          localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
          localStorage.setItem('checkedIngredients', JSON.stringify(''));
          history.push('/done-recipes');
        } }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
