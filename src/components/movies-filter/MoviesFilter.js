import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../features/movies/moviesSlice';

export const MoviesFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));  // Dispatch filter value to Redux store
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        onChange={handleFilterChange}
      />
    </div>
  );
};