
import './ToggleButtons.css';

import PropTypes from 'prop-types';

const ToggleButtons = ({ mode, setMode }) => {
  return (
    <div className="toggle-buttons">
      <button onClick={() => setMode('now-playing')} className={mode === 'now-playing' ? 'active' : ''}>
        Now Playing
      </button>
      <button onClick={() => setMode('search')} className={mode === 'search' ? 'active' : ''}>
        Search
      </button>
    </div>
  );
};

ToggleButtons.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};


export default ToggleButtons;
