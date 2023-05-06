import pofileIcon from '../../images/profileIcon.svg';

function ProfileHeader() {
  return (
    <div>
      <h1 data-testid="page-title">Profile</h1>
      <img
        src={ pofileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
      />
    </div>
  );
}

export default ProfileHeader;
