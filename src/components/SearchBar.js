// endoints api de comida
// Search meal by name
// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

// List all meals by first letter
// www.themealdb.com/api/json/v1/1/search.php?f=a

// Filter by main ingredient
// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

// endpoints api de bebida
// Search cocktail by name
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// List all cocktails by first letter
// www.thecocktaildb.com/api/json/v1/1/search.php?f=a

// Search ingredient by name
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

// Search by ingredient
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
// www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka

function SearchBar() {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="searchInput"
        placeholder="Search"
      />
      <input
        type="radio"
        name="search"
        data-testid="ingredient-search-radio"
      />
      Ingredient
      <input
        type="radio"
        name="search"
        data-testid="name-search-radio"
      />
      Name
      <input
        type="radio"
        name="search"
        data-testid="first-letter-search-radio"
      />
      First letter
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
