import { useState } from 'react';
import propTypes from 'prop-types';
import copy from 'clipboard-copy';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function RecipeCard({ recipe, index, unfavoriteRecipeById }) {
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const handleClickShare = () => {
    const url = `${window.location.origin}/${recipe.type}s/${recipe.id}`;
    copy(url);
    setShowCopyMessage(true);
  };

  const handleClickUnfavorite = () => {
    // executar a funcao que tira do array e do localstorage, passando o id da receita
    unfavoriteRecipeById(recipe.id);
  };

  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { recipe.type === 'meal'
          ? (
            `${recipe.nationality} - ${recipe.category}`
          )
          : (
            recipe.alcoholicOrNot
          )}
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
      { showCopyMessage && <p>Link copied!</p>}
      <button
        onClick={ handleClickShare }
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <img src={ shareIcon } alt="search icon" />
      </button>
      <button
        src={ blackHeartIcon }
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ handleClickUnfavorite }
      >
        <img src={ blackHeartIcon } alt="black heart" />
      </button>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: propTypes.shape({
    id: propTypes.string,
    type: propTypes.string,
    nationality: propTypes.string,
    category: propTypes.string,
    alcoholicOrNot: propTypes.string,
    name: propTypes.string,
    image: propTypes.string,
  }).isRequired,
  index: propTypes.number.isRequired,
  unfavoriteRecipeById: propTypes.func.isRequired,
};

export { RecipeCard };
