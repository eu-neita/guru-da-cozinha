import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Login() {
  const SEIS = 6;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [redirectToMeals, setRedirectToMeals] = useState(false);

  const isValidEmail = (emailTest) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailTest);
  };

  const handleEmailChange = (e) => {
    const newPassword = password;
    const newEmail = e.target.value;
    const newIsButtonDisabled = !isValidEmail(newEmail) || newPassword.length <= SEIS;
    setEmail(newEmail);
    setIsButtonDisabled(newIsButtonDisabled);
  };

  const handlePasswordChange = (e) => {
    const newEmail = email;
    const newPassword = e.target.value;
    const newIsButtonDisabled = !isValidEmail(newEmail) || newPassword.length <= SEIS;
    setPassword(newPassword);
    setIsButtonDisabled(newIsButtonDisabled);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (isValidEmail(email) && password.length > SEIS) {
      localStorage.setItem('user', JSON.stringify({ email }));
      setRedirectToMeals(true);
    }
  };

  if (redirectToMeals) {
    return <Redirect to="/meals" />;
  }

  return (
    <form>
      <div>
        <label htmlFor="email-input">Email:</label>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleEmailChange }
        />
      </div>
      <div>
        <label htmlFor="password-input">Password:</label>
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handlePasswordChange }
        />
      </div>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isButtonDisabled }
        onClick={ handleClick }
      >
        Login
      </button>
    </form>
  );
}
