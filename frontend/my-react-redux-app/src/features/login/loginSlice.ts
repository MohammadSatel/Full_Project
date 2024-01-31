import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from './loginApi';
import { login } from '../auth/authSlice';


// Defines the shape of the user object for authentication
interface AuthUser {
  is_superuser: AuthUser | null;
  id: number;
  username: string;
}

// Defines the expected response structure from the login API
interface ApiResponse {
  access_token: string;
  user: AuthUser;
}

// State structure for the login feature
interface LoginState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// The initial state when the app loads
const initialState: LoginState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Async thunk to handle user login
export const loginUser = createAsyncThunk('login/loginUser', async (credentials: any, { dispatch }) => {
  try {
    const response = await loginApi(credentials);
    const apiResponse: ApiResponse = response.data;

    console.log('API Response:', apiResponse);

    const token = apiResponse.access_token;

    if (!token) {
      throw new Error('Access token not found in the API response');
    }

    sessionStorage.setItem('authToken', token);

    // Dispatch the login action with the received access token
    dispatch(login(apiResponse.access_token));

    const authUser: AuthUser = apiResponse.user;

    if (!authUser) {
      throw new Error('User data not found in the API response');
    }

    return authUser;
  } catch (error: any) {
    console.error('Error in loginUser:', error);
    throw error;
  }
});

// Async thunk to handle user logout
export const logoutUser = createAsyncThunk<null, void, { rejectValue: string }>(
  'login/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      sessionStorage.removeItem('authToken');
      return null;
    } catch (error: any) {
      console.error('Error in logoutUser:', error);
      return rejectWithValue(error.response?.data ?? 'An error occurred during logout');
    }
  }
);

// The loginSlice contains reducers and extra reducers for handling login and logout actions
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.error = 'Unauthorized access. Please check your credentials.';
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export the reducer to be included in the store
export default loginSlice.reducer;
