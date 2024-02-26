// src/pages/SignUpPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInPage from './signIn';

describe('LoginPage', () => {
  test('renders sign-in form', () => {
    render(<SignInPage />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByText(/login/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('calls handleSignUp function on button click', () => {
    const handleSignUpMock = jest.fn();
    render(<SignInPage />);
    const loginButton = screen.getByText(/login/i);

    // Mock the handleSignUp function
    jest.mock('./signIn', () => ({
      handleSignUp: handleSignUpMock,
    }));

    // Simulate user input
    fireEvent.click(loginButton);

    // Expect the handleSignUp function to be called
    expect(handleSignUpMock).toHaveBeenCalledTimes(1);
  });
});
