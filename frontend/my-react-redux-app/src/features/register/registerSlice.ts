import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerApi } from './registerApi';


// Interface to define the structure of the registration state
interface RegisterState {
  user: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// The initial state for the registration slice
const initialState: RegisterState = {
  user: null,
  status: 'idle',
  error: null,
};

// Asynchronous thunk action for registering a user
export const registerUser = createAsyncThunk('register/registerUser', async (userData: any) => {
  try {
    const response = await registerApi(userData);
    return response.data; // Adjust based on your API response structure
  } catch (error) {
    // Handle error scenarios
    throw new Error('Registration failed'); // Adjust as needed
  }
});

// Slice to handle user registration state and actions
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the user state with the received data
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

// Export the reducer to be included in the store
export default registerSlice.reducer;
