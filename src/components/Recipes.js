import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApiData from '../services/fetchRecipes';
import '../styles/Recipes.css';

function Recipes({ value }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await fetchApiData(value);
      setRecipes(data);
    };
    fetchRecipes();
  }, [value]);

  const MAX_RESULTS = 12;
  const results = recipes.slice(0, MAX_RESULTS);

  return (
    <div>
      Eu sou o componente recipes
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
