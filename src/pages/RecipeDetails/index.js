import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import './Style.css';
import shareIcon from '../../images/shareIcon.svg';

export default function RecipeDetails() {
  const { location: { pathname }, push } = useHistory();
  const [buttonText, setButtonText] = useState('Start Recipe');
  const [hideButton, setHideButton] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const isMeal = pathname.includes('meals');

  const vinte = 20;
  const menosOnze = -11;
  const seis = 6;
  const doisMil = 2000;

  const getEndPoint = (path, id) => ({
    endPoint: `https://www.${path.includes('drinks') ? 'thecocktaildb' : 'themealdb'}.com/api/json/v1/1/lookup.php?i=${id}`,
    suggestion: `https://www.${path.includes('drinks') ? 'themealdb' : 'thecocktaildb'}.com/api/json/v1/1/search.php?s=`,
  });

  const fetchAPI = useCallback(async () => {
    const id = pathname.split('/').pop();
    const { endPoint, suggestion } = getEndPoint(pathname, id);

    try {
      const [dataRecipes, dataRecommendations] = await Promise.all([
        fetch(endPoint).then((res) => res.json()),
        fetch(suggestion).then((res) => res.json()),
      ]);

      if (pathname.includes('meals')) {
        setRecipeData(dataRecipes.meals);
        setRecommendations(dataRecommendations.drinks);
      }

      if (pathname.includes('drinks')) {
        setRecipeData(dataRecipes.drinks);
        setRecommendations(dataRecommendations.meals);
      }
    } catch (error) {
      console.log(error);
    }
  }, [pathname]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  useEffect(() => {
    const id = pathname.split('/').pop();
    const doneRecipesObject = localStorage.getItem('doneRecipes') || [];
    if (doneRecipesObject.length !== 0) {
      const doneRecipes = JSON.parse(doneRecipesObject);
      const check = doneRecipes.some((done) => Number(done.id) === Number(id));
      if (check) setHideButton(check);
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const recipeInProgress = inProgressRecipes[isMeal ? 'meals' : 'drinks'];
    if (recipeInProgress) {
      setButtonText('Continue Recipe');
    }
  }, [isMeal, pathname]);

  if (!recipeData) return null;

  const recipe = recipeData[0];
  const ingredients = [];
  for (let i = 1; i <= vinte; i += 1) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        name: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

  const handleClick = () => {
    const route = pathname.includes('meals')
      ? `/meals/${recipe.idMeal}/in-progress` : `/drinks/${recipe.idDrink}/in-progress`;
    push(route);
  };

  console.log('id:', recipe.idMeal);

  const shareButton = (
    <button
      type="button"
      data-testid="share-btn"
      className="share-btn"
      onClick={ () => {
        copy(window.location.href);
        setLinkCopied(true);
        setTimeout(() => {
          setLinkCopied(false);
        }, doisMil);
      } }
    >
      <img
        src={ shareIcon }
        alt="Share"
      />
    </button>
  );

  const favoriteButton = (
    <button
      type="button"
      data-testid="favorite-btn"
      className="favorite-btn"
      onClick={ () => {
        console.log('Favorite button clicked');
      } }
    >
      Favorite
    </button>
  );

  return (
    <div className="recipe-details">
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="Recipe"
        data-testid="recipe-photo"
        className="recipe-photo"
      />
      {favoriteButton}
      {shareButton}
      {linkCopied && <span>Link copied!</span>}
      <h2
        data-testid="recipe-title"
        className="recipe-title"
      >
        {recipe.strMeal || recipe.strDrink}

      </h2>
      <p data-testid="recipe-category" className="recipe-category">
        {isMeal ? recipe.strCategory : recipe.strAlcoholic}
      </p>
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <li
            key={ ingredient.name }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient.name}
            {' '}
            -
            {' '}
            {ingredient.measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions" className="instructions">{recipe.strInstructions}</p>

      {isMeal && (
        <iframe
          src={ `https://www.youtube.com/embed/${recipe.strYoutube.slice(menosOnze)}` }
          title="Recipe video"
          data-testid="video"
          className="video"
        />
      )}
      <section className="carousel">
        {
          recommendations?.slice(0, seis).map((suggestion, index) => (
            <div
              className="carousel-card"
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
              <img
                src={
                  pathname?.includes('meals')
                    ? suggestion.strDrinkThumb
                    : suggestion.strMealThumb
                }
                alt={
                  pathname?.includes('meals')
                    ? suggestion.strDrink
                    : suggestion.strMeal
                }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {
                  pathname?.includes('meals')
                    ? suggestion.strDrink
                    : suggestion.strMeal
                }
              </p>
            </div>))
        }
      </section>
      { !hideButton
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          onClick={ handleClick }
          style={ { position: 'fixed', bottom: 0 } }
        >
          {buttonText}
        </button>
      )}

    </div>
  );
}
