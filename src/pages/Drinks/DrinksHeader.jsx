import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import pofileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function DrinksHeader() {
  const [isSearch, setIsSearch] = useState(false);
  const history = useHistory();
  return (
    <div>
      <h1 data-testid="page-title">Drinks</h1>
      <button onClick={ () => history.push('/profile') }>
        <img
          src={ pofileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>
      <button
        onClick={ () => (isSearch === true ? setIsSearch(false) : setIsSearch(true)) }
      >
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      </button>

      {isSearch && <input data-testid="search-input" type="text" name="searchInput" />}
    </div>
  );
}

export default DrinksHeader;
