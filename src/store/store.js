import { configureStore } from '@reduxjs/toolkit';
import moviesReducer, { setMovies } from '../features/movies/moviesSlice';  // Path to your movies slice
import moviesSlice from '../features/movies/moviesSlice';
import {composeWithDevTools}from "redux-devtools-extension";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,  // Add movies slice to the store
 },
});