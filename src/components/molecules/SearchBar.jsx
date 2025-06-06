import React from 'react';
import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = 'Search by location or property name...', className = '' }) => {
  const handleChange = (e) => {
    if (onSearchChange && typeof onSearchChange === 'function') {
      onSearchChange(e);
    }
  };

  return (
    <div className={`flex-1 relative ${className}`}>
      <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm || ''}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-3"
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SearchBar;