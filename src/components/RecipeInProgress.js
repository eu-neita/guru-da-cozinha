import hartBtn from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const estadoComReceita = {
    photo: '../images/whiteHeartIcon.svg',
    title: 'Coração Branco',
    category: 'categoria',
    instructions: 'instrução',
  };
  return (
    <div>
      <img
        src={ estadoComReceita.photo }
        alt={ estadoComReceita.title }
        data-testid="recipe-photo"
      />

      <span data-testid="recipe-title">{ estadoComReceita.title }</span>

      <button
        data-testid="share-btn"
      >
        Share
      </button>

      <button data-testid="favorite-btn">
        <img src={ hartBtn } alt="favorite Icon" />
      </button>

      <span data-testid="recipe-category">{ estadoComReceita.category }</span>
      <span data-testid="instructions">{ estadoComReceita.instructions }</span>
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;

// 1a - fazer pegar os dados somente de uma receita com um id especifico

// 2 a - construir a tela com as informaçoes da receita em progresso;
