import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../../components/SearchBar';

function MealsHeader() {
  const [isSearch, setIsSearch] = useState(false);
  const history = useHistory();
  return (
    <div>
      <h1 data-testid="page-title">Meals</h1>
      <button onClick={ () => history.push('/profile') }>
        <img
          src={ profileIcon }
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

      {isSearch && <SearchBar type="meals" />}
    </div>
  );
}

export default MealsHeader;
