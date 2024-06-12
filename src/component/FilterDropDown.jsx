import React from 'react';
import PropTypes from 'prop-types';
import './FilterDropdown.css';

// Dropdown component for filtering
const FilterDropdown = ({ options, onSelect }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onSelect(value);
  };
// Dropdown component for filtering
  return (
    <select className="filter-dropdown" onChange={handleChange}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// PropTypes for FilterDropdown
FilterDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default FilterDropdown;
