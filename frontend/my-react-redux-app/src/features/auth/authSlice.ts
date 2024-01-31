import { createSlice } from '@reduxjs/toolkit';


// Define the shape of the authentication state in the application
interface AuthState {
  isAuthenticated: boolean;
  authToken: string | null; 
}

// Define the initial state for the auth slice based on the AuthState interface
const initialState: AuthState = {
  isAuthenticated: false,
  authToken: null,
};

// Create a slice for authentication with reducers to handle login and logout actions
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer to handle login action
    login: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = null;
    },
  },
});

// Export the actions from the auth slice
export const { login, logout } = authSlice.actions;

// Export the reducer to be included in the Redux store
export default authSlice.reducer;
