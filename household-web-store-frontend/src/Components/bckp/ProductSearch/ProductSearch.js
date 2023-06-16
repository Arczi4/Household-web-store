import React, { useState } from 'react';
import './ProductSearch.css';
const ProductSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={handleInputChange}
    />
  );
};

export default ProductSearch;
