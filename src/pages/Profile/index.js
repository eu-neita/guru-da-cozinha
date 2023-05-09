import React from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user ? user.email : '';
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <div>
        <h3 data-testid="profile-email">{userEmail}</h3>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        </Link>
        <button data-testid="profile-logout-btn" onClick={ handleLogout }>
          Logout
        </button>
      </div>

      <Footer />
      {localStorage.getItem('user') ? null : <Redirect to="/" />}
    </>
  );
}

export default Profile;
