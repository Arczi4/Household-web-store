import React, { useState } from 'react';
import './ProductsPage.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import exampleProducts from './exampleProducts';
import Catalog from '../../Components/Catalog/Catalog.js';
import FilterSort from '../../Components/FilterSort/FilterSort';

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  const categories = ['All', 'Cleaning', 'Garden', 'Bedroom', 'Living room', 'Kitchen'];

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'priceAsc':
        return products.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return products.sort((a, b) => b.price - a.price);
      case 'ratingAsc':
        return products.sort((a, b) => a.rating - b.rating);
      case 'ratingDesc':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  };

  const filteredProducts = exampleProducts
    .filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .slice(); // Create a copy to avoid mutating the original array

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div>
      <Header />
      <div className="products-page">
        <h1 className='products-title'>Products</h1>
        <FilterSort
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
        />
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <Catalog key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
