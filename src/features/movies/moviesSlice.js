import { createSlice } from '@reduxjs/toolkit';

// Initial state for movies and filter
const initialState = {
  movies: [],
  filter: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// Export the action creators
export const { setMovies, setFilter } = moviesSlice.actions;

// Export the reducer
export default moviesSlice.reducer;