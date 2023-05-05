import pofileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function MealsHeader() {
  return (
    <div>
      <h1>Meals</h1>
      <img
        src={ pofileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
      />
      <img
        src={ searchIcon }
        alt="search icon"
        data-testid="search-top-btn"
      />
    </div>
  );
}

export default MealsHeader;
