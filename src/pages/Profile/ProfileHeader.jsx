import { useHistory } from 'react-router-dom';
import pofileIcon from '../../images/profileIcon.svg';

function ProfileHeader() {
  const history = useHistory();
  return (
    <div>
      <h1 data-testid="page-title">Profile</h1>
      <button onClick={ () => history.push('/profile') }>
        <img
          src={ pofileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>
    </div>
  );
}

export default ProfileHeader;
