import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';  // Import Row and Col from React Bootstrap
import { MoviesFilter } from '../movies-filter/MoviesFilter';
import { MovieCard } from '../movie-card/movie-card';  // Import MovieCard component

export const MoviesList = ({ onFavoriteToggle }) => {
  const movies = useSelector((state) => state.movies.movies);  // Access movies state from Redux store
  const filter = useSelector((state) => state.movies.filter);  // Access filter state

  // Filter the movies based on the search input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="movies-list">
      <MoviesFilter />  {/* Movie search filter */}
      <Row>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col key={movie.id}>
              <MovieCard
                movie={movie}
                isFavorite={movie.is_favorite}
                onFavoriteToggle={onFavoriteToggle}
              />
            </Col>
          ))
        ) : (
          <Col>No movies found</Col>
        )}
      </Row>
    </div>
  );
};
