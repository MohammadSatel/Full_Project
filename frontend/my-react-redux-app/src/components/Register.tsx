import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';
import { registerUser } from '../features/register/registerSlice';
import '../features/register/Register.css'; // Import the CSS file for styling


// Functional component for user registration
const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, error, user } = useSelector((state: RootState) => state.register);

  // Handler function for the register button click event
  const handleRegister = async () => {
    try {
      const resultAction = await dispatch(registerUser({ username, email, password }));
      if (registerUser.fulfilled.match(resultAction)) {
        // Access the registered user's username directly from the response
        const registeredUsername = resultAction.payload.user.username;
        console.log('Registered Username:', registeredUsername);

        // Assuming you have a setUsername function to update the state
        setUsername(registeredUsername);

        // You can set the username to state or use it as needed
      } else if (registerUser.rejected.match(resultAction)) {
        // Handle error if needed
      }
    } catch (error) {
      // Handle other errors if needed
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <div className="register-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="register-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={status === 'loading'}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="register-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={status === 'loading'}
        />

        <button
          type="button"
          className="register-button"
          onClick={handleRegister}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {user && (
        <div className="success-message">
          Registration successful for {user.username}!
        </div>
      )}
    </div>
  );
};

export default Register;
