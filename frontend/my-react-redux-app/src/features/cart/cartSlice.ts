import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


// Interface defining the structure of a JWT token object
export interface JwtToken {
  user_id: number;
}

// Interface defining the structure of an item in the shopping cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Interface defining the state of the shopping cart
interface CartState {
  items: CartItem[];
}

// The initial state of the cart when the application loads
const initialState: CartState = {
  items: [],
};

// The cart slice containing reducers for actions related to the shopping cart
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = []; // Clears the cart
    },
  },
});

// Export the actions from the cart slice
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
