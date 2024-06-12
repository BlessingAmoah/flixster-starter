/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from './component/Header';
import MoviesList from './component/MoviesList';
import SearchBar from './component/SearchBar';
import ToggleButtons from './component/ToggleButtons';
import Footer from './component/Footer';
import './App.css';

// renders the app component
function App() {
  const [mode, setMode] = useState('now-playing');

  return (
    <div className="container">
      <Header />
      <ToggleButtons mode={mode} setMode={setMode} />
      {mode === 'now-playing' ? <MoviesList /> : <SearchBar />}
      <Footer />

    </div>
  );
}

export default App;
