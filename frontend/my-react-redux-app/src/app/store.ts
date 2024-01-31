// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import registerReducer from '../features/register/registerSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer, 
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
