import { useState } from 'react';
import { FilterBar } from './FilterBar';
import { RecipeCard } from './RecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ) || []);

  // Criar uma função que recebe um id modifica o estado e o localstorage
  const unfavoriteRecipeById = (recipeId) => {
    // quando vai alterar um estado, fazer uma cópia, alterar a cópia, depois setar o estado com o valor alterado da cópia
    const updatedFavoriteRecipes = [...favoriteRecipes];

    const recipeIndex = updatedFavoriteRecipes.findIndex(
      (favoriteRecipe) => favoriteRecipe.id === recipeId,
    );

    updatedFavoriteRecipes.splice(recipeIndex, 1);

    setFavoriteRecipes(updatedFavoriteRecipes);

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
  };

  return (
    <>
      <FilterBar />
      {favoriteRecipes.map((favoriteRecipe, index) => (
        // mandar como props para o recipe card, a função criada
        <RecipeCard
          key={ favoriteRecipe.id }
          recipe={ favoriteRecipe }
          index={ index }
          unfavoriteRecipeById={ unfavoriteRecipeById }
        />
      ))}
    </>
  );
}

export default FavoriteRecipes;
