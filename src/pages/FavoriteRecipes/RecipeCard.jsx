import propTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function RecipeCard({ recipe, index }) {
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
        { `${recipe.nationality} - ${recipe.category}` }
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
      <button src={ shareIcon } data-testid={ `${index}-horizontal-share-btn` }>
        <img src={ shareIcon } alt="search icon" />
      </button>
      <button src={ blackHeartIcon } data-testid={ `${index}-horizontal-favorite-btn` }>
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
};

export { RecipeCard };
