import { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Context from '../contexts/Context';

function SearchBar({ type }) {
  const { setFilterData, setRecipes } = useContext(Context);
  const [searchInput, setSearchInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const { push } = useHistory();

  const verifyResults = (foundRecipes) => {
    if (foundRecipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (foundRecipes.length === 1) {
      const recipeId = type === 'drinks'
        ? foundRecipes[0].idDrink
        : foundRecipes[0].idMeal;
      push(`/${type}/${recipeId}`);
    } else {
      setFilterData(foundRecipes);
      setRecipes(foundRecipes);
    }
  };

  // const verifyLengthResults = (results) => {
  //   if (searchType === 'Meals' && results.meals.length === 1) {
  //     return verifyResults();
  //   }
  //   if (searchType === 'Drinks' && results.drinks.length === 1) {
  //     return verifyResults();
  //   }
  //   setFilterData(results);
  // };

  const getIngredient = async () => {
    const url = type === 'drinks'
      ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    const fetchAPI = await fetch(url);
    const data = await fetchAPI.json();
    const foundRecipes = data[type];

    verifyResults(foundRecipes);
  };

  const getName = async () => {
    const url = type === 'drinks'
      ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    const fetchAPI = await fetch(url);
    const data = await fetchAPI.json();
    const foundRecipes = data[type];

    verifyResults(foundRecipes);
  };

  const getFirstLetter = async () => {
    const url = type === 'drinks'
      ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`
      : `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
    const fetchAPI = await fetch(url);
    const data = await fetchAPI.json();
    const foundRecipes = data[type];

    verifyResults(foundRecipes);
  };

  const verifyRadioButton = () => {
    switch (valueInput) {
    case 'ingredient':
      return getIngredient();
    case 'name':
      return getName();
    case 'firstLetter':
      return getFirstLetter();
    default:
      return null;
    }
  };

  const verifyFirstLetter = () => {
    if (valueInput === 'firstLetter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const checkValuesToFetch = async () => {
    verifyRadioButton();
    verifyFirstLetter();
  };

  const handleClick = () => {
    checkValuesToFetch();
    // if (valueInput === 'firstLetter' && searchInput.length > 1) {
    //   global.alert('Your search must have only 1 (one) character');
    // }
    // switch (valueInput) {
    // case 'ingredient':
    //   return getIngredient();
    // case 'name':
    //   return getName();
    // case 'firstLetter':
    //   return getFirstLetter();
    // default:
    //   return null;
    // }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        value={ searchInput }
        type="text"
        name="searchInput"
        placeholder="Search"
        onChange={ (event) => setSearchInput(event.target.value) }
      />
      <input
        value="ingredient"
        type="radio"
        name="search"
        data-testid="ingredient-search-radio"
        onClick={ (event) => setValueInput(event.target.value) }
      />
      Ingredient
      <input
        value="name"
        type="radio"
        name="search"
        data-testid="name-search-radio"
        onClick={ (event) => setValueInput(event.target.value) }
      />
      Name
      <input
        value="firstLetter"
        type="radio"
        name="search"
        data-testid="first-letter-search-radio"
        onClick={ (event) => setValueInput(event.target.value) }
      />
      First letter
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search

      </button>
    </div>
  );
}

SearchBar.propTypes = {
  type: propTypes.string.isRequired,
};

export default SearchBar;
