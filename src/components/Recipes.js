import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchApiData from '../services/fetchRecipes';
import '../styles/Recipes.css';
import fetchCategoryData from '../services/fetchCategory';
import { fetchFilterMeal, fetchFilterDrink } from '../services/fetchFilter';

function Recipes({ value }) {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState([]);
  const [recipesByCategory, setRecipesByCategory] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await fetchApiData(value);
      setRecipes(data);
    };
    const fetchCategory = async () => {
      const data = await fetchCategoryData(value);
      setCategory(data);
    };
    fetchRecipes();
    fetchCategory();
  }, [value]);

  const MAX_RECIPES = 12;
  let results = recipes.slice(0, MAX_RECIPES);

  const MAX_CATEGORY = 5;
  const categoryResults = category.slice(0, MAX_CATEGORY);

  const handleClickFilter = async (page, catFil) => {
    if (page === 'Meals') {
      const newByCategory = await fetchFilterMeal(catFil);
      setRecipesByCategory(newByCategory);
      console.log(newByCategory);
    }
    if (page === 'Drinks') {
      const newByCategory = await fetchFilterDrink(catFil);
      setRecipesByCategory(newByCategory);
      console.log(newByCategory);
    }
  };

  const removeFilter = () => {
    setRecipesByCategory([]);
  };

  if (recipesByCategory.length > 0) {
    results = recipesByCategory.slice(0, MAX_RECIPES);
  }

  return (
    <div>
      Eu sou o componente recipes
      <button
        data-testid="All-category-filter"
        onClick={ () => removeFilter() }
      >
        All
      </button>
      {value === 'Meals' && (
        categoryResults?.map((cat, index) => (
          <button
            data-testid={ `${cat.strCategory}-category-filter` }
            key={ index }
            onClick={ () => handleClickFilter(value, cat.strCategory) }
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
            onClick={ () => handleClickFilter(value, cat.strCategory) }
          >
            {cat.strCategory}
          </button>
        ))
      )}
      {value === 'Meals' && (
        results?.map((recipe, index) => (
          <Link key={ recipe.idMeal } to={ `/meals/${recipe.idMeal}` }>
            <div
              className="recipe-card"
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
          </Link>
        )))}
      {value === 'Drinks' && (
        results?.map((recipe, index) => (
          <Link key={ recipe.idDrink } to={ `/drinks/${recipe.idDrink}` }>
            <div
              className="recipe-card"
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
          </Link>
        )))}
    </div>
  );
}

Recipes.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Recipes;
