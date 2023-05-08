import React from 'react';

export default function Login() {
  return (
    <form>
      <div>
        <label htmlFor="email-input">E-mail:</label>
        <input
          type="email"
          data-testid="email-input"
        />
      </div>
      <div>
        <label htmlFor="password-input">Senha:</label>
        <input
          type="password"
          data-testid="password-input"
        />
      </div>
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}
