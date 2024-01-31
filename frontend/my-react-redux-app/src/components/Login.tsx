import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { loginUser } from '../features/login/loginSlice';
import '../features/login/Login.css'; // Ensure this path is correct

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status, error, user } = useSelector((state: RootState) => state.login);

  const handleLogin = async () => {
    await dispatch(loginUser({ username, password }));
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          className="login-input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          className="login-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={status === 'loading'}
        />
      </div>
      <button
        type="button"
        className="login-button"
        onClick={handleLogin}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Logging In...' : 'Login'}
      </button>
      {error && <div className="error-message">{error}</div>}
      {user && <div className="success-message">Welcome, {user.username}!</div>}
      <div className="forgot-password-link">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
      <div className="register-link">
        Don't have an account yet? <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default Login;
