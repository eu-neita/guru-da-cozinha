import propTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
      <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
      <button data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</button>
      <button data-testid={ `${index}-horizontal-favorite-btn` }>Favoritar</button>
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
