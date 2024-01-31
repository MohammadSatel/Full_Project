import axios, { AxiosRequestConfig } from 'axios';


// Base URL for the API endpoint
const BASE_URL = 'http://localhost:8000'; // Replace with your backend API URL

// Async function to call the login API endpoint.
export const loginApi = async (credentials: any) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // Attempt to post the credentials to the login endpoint using axios.
  try { 
    const response = await axios.post(`${BASE_URL}/login/`, credentials, config);
    return response;
  } catch (error) {
  // If the API call fails, catch and rethrow the error.

    throw error;
  }
};
