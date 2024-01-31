import { createSlice } from '@reduxjs/toolkit';


// Defines the shape of a Review object in the state
export interface Review {
  id: number;
  image: string;
  text: string;
  author: string;
}

// The initial state for the reviews slice containing a list of review objects
const initialState: Review[] = [
  { id: 1, image: '/images/image1.jpg', text: 'Amazing car, it gets a lot of attention on the streets.', author: 'Uri Slava' },
  { id: 2, image: '/images/image2.jpg', text: 'I kept this car after renting it, thank you for this service!', author: 'Karen Bomer' },
  { id: 3, image: '/images/image3.jpg', text: 'I am impressed with the power of this car. Highly satisfied!', author: 'Dona Diego' },
  { id: 4, image: '/images/image4.jpg', text: 'Great value for money! I will definetly use this service again.', author: 'Billy Rato' }
];

// Creates a slice for reviews with the initial state and reducers
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
  },
});

// Selector function to get all reviews from the state
export const selectAllReviews = (state: any) => state.reviews;

// The reducer for the reviews slice which will be used in the store
export default reviewsSlice.reducer;
