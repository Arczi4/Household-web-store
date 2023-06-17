import React from 'react';
import './FilterSort.css';

const FilterSort = ({ categories, activeCategory, onSelectCategory, onSearch, onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="filter-sort-container">
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={category === activeCategory ? 'active' : ''}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="search-bar-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="sort-dropdown-container">
        <select className="sort-dropdown" onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="priceAsc">Price (Low to High)</option>
          <option value="priceDesc">Price (High to Low)</option>
          <option value="ratingAsc">Rating (Low to High)</option>
          <option value="ratingDesc">Rating (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
