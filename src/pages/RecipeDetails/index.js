import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeDetails() {
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { location: { pathname } } = useHistory();
  const isMeal = pathname.includes('meals');

  const vinte = 20;
  const menosOnze = -11;
  const seis = 6;

  useEffect(() => {
    const id = pathname.split('/').pop();
    const apiUrl = isMeal
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRecipeData(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [pathname, isMeal]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          isMeal
            ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
            : 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        );
        const data = await response.json();
        setRecommendations(isMeal ? data.drinks : data.meals);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecommendations();
  }, [isMeal]);

  if (isLoading) return <div>Loading...</div>;

  if (!recipeData) return null;

  const recipe = isMeal ? recipeData.meals[0] : recipeData.drinks[0];
  const ingredients = [];
  for (let i = 1; i <= vinte; i += 1) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push({
        name: recipe[`strIngredient${i}`],
        measure: recipe[`strMeasure${i}`],
      });
    }
  }

  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      <p data-testid="recipe-category">
        {isMeal ? recipe.strCategory : recipe.strAlcoholic}
      </p>
      <ul>
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
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {isMeal && (
        <iframe
          src={ `https://www.youtube.com/embed/${recipe.strYoutube.slice(menosOnze)}` }
          title="Recipe video"
          data-testid="video"
        />
      )}
      <h3>Recommendations</h3>
      <ul>
        {recommendations.slice(0, seis).map((recommendation) => (
          <li key={ recommendation.idMeal || recommendation.idDrink }>
            {recommendation.strMeal || recommendation.strDrink}
          </li>
        ))}
      </ul>
    </div>
  );
}
