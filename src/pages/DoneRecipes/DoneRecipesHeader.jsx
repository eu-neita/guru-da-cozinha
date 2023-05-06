import pofileIcon from '../../images/profileIcon.svg';

function DoneRecipesHeader() {
  return (
    <div>
      <h1 data-testid="page-title">Done Recipes</h1>
      <img
        src={ pofileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
      />
    </div>
  );
}

export default DoneRecipesHeader;
