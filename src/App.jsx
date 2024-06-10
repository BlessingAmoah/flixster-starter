
import React, { useState } from 'react';
import MoviesList from './component/MoviesList';
import SearchBar from './component/SearchBar';
import ToggleButtons from './component/ToggleButtons';
import './App.css';

function App() {
  const [mode, setMode] = useState('now-playing');

  return (
    <div className="container">
      <ToggleButtons mode={mode} setMode={setMode} />
      {mode === 'now-playing' ? <MoviesList /> : <SearchBar />}
    </div>
  );
}

export default App;
