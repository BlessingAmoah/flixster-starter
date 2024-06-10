import PropTypes from 'prop-types';
import './Movie.css';

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
  }).isRequired,
};

export default Movie;
