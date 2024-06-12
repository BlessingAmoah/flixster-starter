
import { useState } from 'react';
import Movie from './Movie';
import './SearchBar.css';

// SearchBar component
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
// Handle search button click
  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    console.log('Searching for:', searchQuery);
    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&query=${searchQuery}&page=1`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Search results:', data);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render the search bar and results
  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search"
        className="search-input"
      />
      <button onClick={handleSearch} disabled={loading} className="search-button">
        {loading ? 'Searching...' : 'Search'}
      </button>
      <div className="movies-list">
        {searchResults.map(movie => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
