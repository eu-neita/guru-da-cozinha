import { Link, useLocation } from 'react-router-dom';
import pofileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { pathname } = useLocation();
  const sameHTML = (
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
  const renderConditionals = () => {
    switch (pathname) {
    case '/':
    case '/meals/:id-da-receita':
    case '/drinks/:id-da-receita':
    case '/drinks/:id-da-receita/in-progress':
    case '/meals/:id-da-receita/in-progress':
      return sameHTML;
    case '/profile':
    case '/done-recipes':
    case '/favorite-recipes':
      return (
        <div>
          <h1>
            {pathname === '/profile' && 'Profile'}
            {pathname === '/done-recipes' && 'Done Recipes'}
            {pathname === '/favorite-recipes' && 'Favorite Recipes'}
          </h1>
          <img
            src={ pofileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </div>
      );
    default:
      return (
        <div>
          <h1>{pathname}</h1>
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
  };

  return <div>{renderConditionals()}</div>;
}

export default Header;
