import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

const Movie = ({ movie, onClick }) => {
  return (
    <div className="movie" onClick={() => onClick(movie)}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Movie;
