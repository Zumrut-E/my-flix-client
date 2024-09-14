import React from 'react';
import { useSelector } from 'react-redux';
import { MoviesFilter } from '../movies-filter/MoviesFilter';
import { MovieCard } from '../movie-card/movie-card';  // Assume you have this component

export const MoviesList = (onFavoriteToggle) => {
  console.log("onFavoriteToggle:", onFavoriteToggle);  // Debugging line
  const movies = useSelector((state) => state.movies.movies);  // Access movies state from Redux store
  const filter = useSelector((state) => state.movies.filter);  // Access filter state

  // Filter the movies based on the search input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <MoviesFilter />  {/* Movie search filter */}
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard 
            key={movie.id} 
            movie={movie} 
            isFavorite={movie.is_favorite}
            onFavoriteToggle={onFavoriteToggle}
            />  // Display each movie card
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};