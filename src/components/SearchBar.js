import { useContext, useState } from 'react';
import Context from '../contexts/Context';

function SearchBar() {
  // const { data, filterData, setFilterData, recipes, setRecipes } = useContext(Context);
  const { setFilterData } = useContext(Context);
  const [searchInput, setSearchInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const getIngredient = async () => {
    const fetchAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
    const { results } = await fetchAPI.json();
    setFilterData(results);
  };

  const getName = async () => {
    const fetchAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const { results } = await fetchAPI.json();
    setFilterData(results);
  };

  const getFirstLetter = async () => {
    const fetchAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
    const { results } = await fetchAPI.json();
    setFilterData(results);
  };

  const handleClick = () => {
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
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

export default SearchBar;
