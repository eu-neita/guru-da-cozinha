import { useState } from 'react';
import { FilterBar } from './FilterBar';
import { RecipeCard } from './RecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(JSON.parse(
    localStorage.getItem('favoriteRecipes'),
  ) || []);

  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState(favoriteRecipes);

  // Criar uma função que recebe um id modifica o estado e o localstorage
  const unfavoriteRecipeById = (recipeId) => {
    // quando vai alterar um estado, fazer uma cópia, alterar a cópia, depois setar o estado com o valor alterado da cópia
    const updatedFavoriteRecipes = [...favoriteRecipes]; // 6

    const recipeIndex = updatedFavoriteRecipes.findIndex(
      (favoriteRecipe) => favoriteRecipe.id === recipeId,
    );

    updatedFavoriteRecipes.splice(recipeIndex, 1);

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));

    setFavoriteRecipes(updatedFavoriteRecipes);

    const updatedFilteredFavoriteRecipes = [...filteredFavoriteRecipes];

    const filteredRecipeIndex = updatedFilteredFavoriteRecipes.findIndex(
      (favoriteRecipe) => favoriteRecipe.id === recipeId,
    );

    updatedFilteredFavoriteRecipes.splice(filteredRecipeIndex, 1);

    setFilteredFavoriteRecipes(updatedFilteredFavoriteRecipes);
  };

  const filterFavoriteRecipeByType = (type) => {
    // criar uma cópia do estado;

    let updatedFilteredFavoriteRecipes = [...favoriteRecipes];

    if (type !== 'all') {
      updatedFilteredFavoriteRecipes = updatedFilteredFavoriteRecipes.filter(
        (favoriteRecipe) => favoriteRecipe.type === type,
      );
    }

    setFilteredFavoriteRecipes(updatedFilteredFavoriteRecipes);
  };

  return (
    <>
      <FilterBar filterFavoriteRecipeByType={ filterFavoriteRecipeByType } />
      {filteredFavoriteRecipes.map((favoriteRecipe, index) => (
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
