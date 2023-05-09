import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApiData from '../services/fetchRecipes';
import '../styles/Recipes.css';
import fetchCategoryData from '../services/fetchCategory';

function Recipes({ value }) {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await fetchApiData(value);
      setRecipes(data);
    };
    const fetchCategory = async () => {
      const data = await fetchCategoryData(value);
      console.log(data);
      setCategory(data);
    };
    fetchRecipes();
    fetchCategory();
  }, [value]);

  const MAX_RECIPES = 12;
  const results = recipes.slice(0, MAX_RECIPES);

  const MAX_CATEGORY = 5;
  const categoryResults = category.slice(0, MAX_CATEGORY);

  return (
    <div>
      Eu sou o componente recipes
      {value === 'Meals' && (
        categoryResults?.map((cat, index) => (
          <button
            data-testid={ `${cat.strCategory}-category-filter` }
            key={ index }
          >
            {cat.strCategory}
          </button>
        ))
      )}
      {value === 'Drinks' && (
        categoryResults?.map((cat, index) => (
          <button
            data-testid={ `${cat.strCategory}-category-filter` }
            key={ index }
          >
            {cat.strCategory}
          </button>
        ))
      )}
      {value === 'Meals' && (
        results?.map((recipe, index) => (
          <div
            className="recipe-card"
            key={ recipe.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid={ `${index}-card-img` }
              className="img-recipe"
            />
            <h2 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h2>
          </div>
        )))}
      {value === 'Drinks' && (
        results?.map((recipe, index) => (
          <div
            className="recipe-card"
            key={ recipe.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
              className="img-recipe"
            />
            <h2 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h2>
          </div>
        )))}
    </div>
  );
}

Recipes.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Recipes;
