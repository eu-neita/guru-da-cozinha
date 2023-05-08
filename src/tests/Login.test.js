import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../components/Login';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BUTTON = 'login-submit-btn';
const EMAIL_TEST = 'validemail@test.com';

describe('Login component', () => {
  it('should render email and password inputs', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should not enable the submit button with invalid email', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const submitButton = getByTestId(LOGIN_SUBMIT_BUTTON);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    expect(submitButton).toBeDisabled();
  });

  it('should not enable the submit button with password length less than 6 characters', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const submitButton = getByTestId(LOGIN_SUBMIT_BUTTON);
    fireEvent.change(emailInput, { target: { value: EMAIL_TEST } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button with valid email and password', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const submitButton = getByTestId(LOGIN_SUBMIT_BUTTON);
    fireEvent.change(emailInput, { target: { value: EMAIL_TEST } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    expect(submitButton).toBeEnabled();
  });

  it('should store user email in localStorage after successful login', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const submitButton = getByTestId(LOGIN_SUBMIT_BUTTON);
    fireEvent.change(emailInput, { target: { value: EMAIL_TEST } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(submitButton);
    expect(localStorage.getItem('user')).toEqual(
      JSON.stringify({ email: EMAIL_TEST }),
    );
  });

  it('should redirect to /meals after successful login', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <Login />
      </Router>,
    );
    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    const submitButton = getByTestId(LOGIN_SUBMIT_BUTTON);
    fireEvent.change(emailInput, { target: { value: EMAIL_TEST } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(submitButton);
    expect(history.location.pathname).toEqual('/meals');
  });
});
