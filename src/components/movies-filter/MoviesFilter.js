import React from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';  // Import Form from React Bootstrap
import { setFilter } from '../../features/movies/moviesSlice';

export const MoviesFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));  // Dispatch filter value to Redux store
  };

  return (
    <div className="movies-filter">
      <Form.Control
        type="text"
        placeholder="Search movies..."
        onChange={handleFilterChange}
        className="mb-3"  // Add margin-bottom for spacing
      />
    </div>
  );
};