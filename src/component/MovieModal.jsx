import React from 'react';
import PropTypes from 'prop-types';
import './MovieModal.css';

// Modal for a single movie
const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;
// modal content
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-header">
          <h2 className="modal-title">{movie.title}</h2>
          {movie.backdrop_path && (
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
          )}
        </div>
        <div className="modal-body">
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

MovieModal.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string,
    runtime: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })).isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieModal;
