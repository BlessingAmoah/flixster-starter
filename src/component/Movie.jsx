import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';


// Moviecard component
const Movie = ({ movie, onClick, isFavorite, onFavoriteToggle, isWatched, onWatchedToggle }) => {
  // Render Moviecard
  return (
    <div className="movie" onClick={() => onClick(movie)}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average}</p>

      <button                // Favorite button and watched button inside Moviecard
        className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle(movie.id);
        }}
      >
        {isFavorite ? '❤️' : '♡'}
      </button>
      <button
        className={`watched-button ${isWatched ? 'watched' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onWatchedToggle(movie.id);
        }}
      >
        {isWatched ? 'Watched ✔️' : 'Mark as Watched'}
      </button>
    </div>
  );
};

// PropTypes for Moviecard component
Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  isWatched: PropTypes.bool.isRequired,
  onWatchedToggle: PropTypes.func.isRequired,
};

export default Movie;
