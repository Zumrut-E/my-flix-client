import { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from 'react-redux';  // Import necessary hooks
import { setMovies } from '../../features/movies/moviesSlice';  // Import setMovies action
import { MoviesList } from '../movies-list/movies-list';  // Import the MoviesList component

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);  // Get movies from the Redux store

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix2024-e1c9b1faca45.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            description: movie.description,
            image_url: movie.image_url,
            genre: movie.genre,
            director: movie.director,
            is_favorite: user?.favorite_movies?.includes(movie._id) || false,
          };
        });

        dispatch(setMovies(moviesFromApi));  // Dispatch movies to the Redux store
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [token, user, dispatch]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleFavoriteToggle = (movieId, isFav) => {
    const updatedUser = { ...user };

    if (!Array.isArray(updatedUser.FavoriteMovies)) {
      updatedUser.FavoriteMovies = [];
    }

    if (isFav) {
      if (!updatedUser.FavoriteMovies.includes(movieId)) {
        updatedUser.FavoriteMovies.push(movieId);
      }
    } else {
      updatedUser.FavoriteMovies = updatedUser.FavoriteMovies.filter(
        (id) => id !== movieId
      );
    }

    setUser(updatedUser);

    // Update the user's favorites on the server
    fetch(`https://myflix2024-e1c9b1faca45.herokuapp.com/users/${user.username}/favorites/${movieId}`, {
      method: isFav ? "POST" : "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser !== 'Movie not found or already in favorites') {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
        }

        if (typeof updatedUser === "object") {
          const updatedMovies = movies.map((movie) =>
            movie.id === movieId ? { ...movie, is_favorite: !movie.is_favorite } : movie
          );
          dispatch(setMovies(updatedMovies));  // Update the Redux store with the new favorite status
        }
      })
      .catch((error) => console.error("Error updating favorites:", error));
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />

      <Row className="justify-content-center mt-4">
        <Col md={6} lg={4}>
          <Routes>
            <Route
              path="/profile"
              element={
                !token ? (
                  <Navigate to="/" replace />
                ) : (
                  <ProfileView user={user} movies={movies} onUserUpdate={setUser} onFavoriteToggle={handleFavoriteToggle} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <SignUpView />
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col className="text-center">This list is empty</Col>
                ) : (
                  <MovieView movies={movies} />
                )
              }
            />
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col className="text-center">The list is empty!</Col>
                ) : (
                  <MoviesList onFavoriteToggle={handleFavoriteToggle} />
                )
              }
            />
          </Routes>
        </Col>
      </Row>
    </BrowserRouter>
  );
};
