import propTypes from 'prop-types';

function FilterBar({ filterFavoriteRecipeByType }) {
  return (
    <>
      <button
        onClick={ () => filterFavoriteRecipeByType('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => filterFavoriteRecipeByType('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        onClick={ () => filterFavoriteRecipeByType('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
    </>
  );
}

FilterBar.propTypes = {
  filterFavoriteRecipeByType: propTypes.func.isRequired,
};

export { FilterBar };
