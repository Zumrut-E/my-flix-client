import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';  // Path to your movies slice

export const store = configureStore({
  reducer: {
    movies: moviesReducer,  // Add movies slice to the store
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools
});