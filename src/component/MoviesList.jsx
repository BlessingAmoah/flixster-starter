import { useEffect, useState } from 'react';
import Movie from './Movie';
import './MoviesList.css';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Fetching movies for page:', page);
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched movies:', data);
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);


  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Now Playing</h1>
      <div className="movies-list">
        {movies.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
      <button onClick={loadMoreMovies} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default MoviesList;
