import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import MovieModal from './MovieModal';
import './MoviesList.css';
import FilterDropdown from './FilterDropDown';

// MovieList component
const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedReleaseYear, setSelectedReleaseYear] = useState('');
  const [selectedVoteAverage, setSelectedVoteAverage] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [watched, setWatched] = useState({});


  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies on mount or when filters change
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`;

      if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
      }
      if (selectedReleaseYear) {
        url += `&primary_release_year=${selectedReleaseYear}`;
      }
      if (selectedVoteAverage) {
        url += `&vote_average.gte=${selectedVoteAverage}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, selectedReleaseYear, selectedVoteAverage, page]);

  // Handle genre, release year and vote average filters
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  const handleReleaseYearSelect = (year) => {
    setSelectedReleaseYear(year);
    setPage(1);
  };

  const handleVoteAverageSelect = (voteAverage) => {
    setSelectedVoteAverage(voteAverage);
    setPage(1);
  };

  // Handle favorite and watched toggle
  const handleFavoriteToggle = (movieId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [movieId]: !prevFavorites[movieId],
    }));
  };

  const handleWatchedToggle = (movieId) => {
    setWatched((prevWatched) => ({
      ...prevWatched,
      [movieId]: !prevWatched[movieId],
    }));
  };

  // Handle movie click
  const handleMovieClick = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>

      <FilterDropdown      // Genre, release year and vote average filters
        options={genres.map((genre) => ({ value: genre.id, label: genre.name }))}
        onSelect={handleGenreSelect}
      />
      <FilterDropdown
        options={[
          { value: '2024', label: '2024' },
          { value: '2023', label: '2023' },
          { value: '2022', label: '2022' },
          { value: '2021', label: '2021' },
          { value: '2020', label: '2020' },
        ]}
        onSelect={handleReleaseYearSelect}
      />
      <FilterDropdown
        options={[
          { value: '7', label: '7 and above' },
          { value: '6', label: '6 and above' },
          { value: '5', label: '5 and above' },
        ]}
        onSelect={handleVoteAverageSelect}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movies-list">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} onClick={() => handleMovieClick(movie)} isFavorite={!!favorites[movie.id]}
            onFavoriteToggle={handleFavoriteToggle}
            isWatched={!!watched[movie.id]}
            onWatchedToggle={handleWatchedToggle} />
          ))}
        </div>
      )}
      <button onClick={loadMoreMovies}>Load More</button>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default MoviesList;
