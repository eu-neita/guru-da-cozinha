import { useHistory } from 'react-router-dom';
import pofileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function HomeHeader() {
  const history = useHistory();
  return (
    <div>
      <button onClick={ () => history.push('/profile') }>
        <img
          src={ pofileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>
      <img
        src={ searchIcon }
        alt="search icon"
        data-testid="search-top-btn"
      />
    </div>
  );
}

export default HomeHeader;
