import { CartItem, JwtToken } from './cartSlice';
import { jwtDecode as jwt_decode } from 'jwt-decode'; 


// Base URL for the orders API endpoint
const BASE_URL = 'http://127.0.0.1:8000';

// Async function to place an order
export const placeOrder = async (authToken: string, cartItems: CartItem[], totalSum: number): Promise<void> => {
  if (!authToken) {
    throw new Error('No auth token provided.');
  }

  // Decode the JWT token to get the user's information, specifically the user_id
  const decodedToken = jwt_decode<JwtToken>(authToken);
  const userId = decodedToken.user_id;

  // Construct the payload for the order
  const orderPayload = {
    total_amount: totalSum,
    user: userId,
    order_details: cartItems.map(item => ({
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
  };

  // Make a POST request to the orders API endpoint with the order payload
  const response = await fetch(`${BASE_URL}/orders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(orderPayload)
  });

  // Check if the response from the API is not ok (i.e., status code is not 2xx)
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  console.log('Order placed successfully');
};
