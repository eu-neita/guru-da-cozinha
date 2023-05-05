import pofileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <div>
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

export default Header;
