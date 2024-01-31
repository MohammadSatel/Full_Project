import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../../app/store';


// Interface defining the structure of a Product object
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | null; // Image as a URL string
}

// Interface for form data when submitting product data, such as in forms
interface ProductFormData {
  id?: number;
  formData: FormData;
}

// State structure for products in the store
interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

// Initial state for the product slice
const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null
};

// Base URL for the products API
const BASE_URL = 'http://127.0.0.1:8000/products';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Product[]>(`${BASE_URL}/`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message);
  }
});

// Async thunk for creating a new product
export const createProduct = createAsyncThunk(
  'products/createProduct', 
  async (productFormData: ProductFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product>(`${BASE_URL}/create/`, productFormData.formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating an existing product
export const updateProduct = createAsyncThunk(
  'products/updateProduct', 
  async (productFormData: ProductFormData, { rejectWithValue }) => {
    try {
      const response = await axios.put<Product>(`${BASE_URL}/update/${productFormData.id}/`, productFormData.formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${id}/`);
    return id;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message);
  }
});

// Product slice containing reducers for handling actions
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch products.';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to create product.';
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to update product.';
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to delete product.';
      });
  },
});

// Export the reducer to be included in the store
export default productsSlice.reducer;
