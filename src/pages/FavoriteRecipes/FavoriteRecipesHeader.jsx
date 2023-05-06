import pofileIcon from '../../images/profileIcon.svg';

function FavoriteRecipesHeader() {
  return (
    <div>
      <h1 data-testid="page-title">Favorite Recipes</h1>
      <img
        src={ pofileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
      />
    </div>
  );
}

export default FavoriteRecipesHeader;
