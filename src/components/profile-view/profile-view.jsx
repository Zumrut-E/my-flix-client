import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { UserForm } from './user-form';
import {FavoriteMovies} from './favorite-movies';
import {UserInfo} from './user-info';
import { Container } from 'react-bootstrap';

export const ProfileView = ({ user, movies, onLoggedOut, onUserUpdate, onFavoriteToggle }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);


  useEffect(() => {
    if (user && Array.isArray(user.favorite_movies) && Array.isArray(movies)) {
      // Safely filter movies based on favorite movie IDs
      const filteredMovies = movies.filter(m => m.is_favorite);
      setFavoriteMovies(filteredMovies);
    } else {
      // Handle cases where user.FavoriteMovies or movies might be undefined or not arrays
      setFavoriteMovies([]);
    }
  }, [user, movies]); // Include user and movies in dependencies

  if (!user || !movies) {
    return <p>Loading...</p>;
  }
  
  return (
    <Container className="profile-view mt-4">
      <h2>Profile Details</h2>
      <div className='row'>
        <div className='col'>
      <UserInfo user={user} />
      </div>
      <div className='col'>
      <UserForm user={user} onUserUpdate={onUserUpdate} onLoggedOut={onLoggedOut} />
      </div>
      </div>
      <FavoriteMovies movies={favoriteMovies} user={user} onUserUpdate={onUserUpdate} onFavoriteToggle={onFavoriteToggle} />
    </Container>
  );
};

