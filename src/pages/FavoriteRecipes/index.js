import { FilterBar } from './FilterBar';
import { RecipeCard } from './RecipeCard';

function FavoriteRecipes() {
  const storagedFavoriteRecipes = JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ) || [];

  return (
    <>
      <FilterBar />
      {storagedFavoriteRecipes.map((favoriteRecipe, index) => (
        <RecipeCard key={ favoriteRecipe.id } recipe={ favoriteRecipe } index={ index } />
      ))}
    </>
  );
}

export default FavoriteRecipes;
