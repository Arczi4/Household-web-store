import React, { useState, useEffect } from 'react';
import './ProductsPage.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Catalog from '../../Components/Catalog/Catalog';
import FilterSort from '../../Components/FilterSort/FilterSort';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  // const categories = ['All', 'Cleaning', 'Garden', 'Bedroom', 'Living room', 'Kitchen'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/product/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 312f0749f5cec769c023b9153cec667c1b5664fe' // kuba1 token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products from the API');
      }

      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/category/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 312f0749f5cec769c023b9153cec667c1b5664fe' // kuba1 token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories from the API');
      }

      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
    }
  };
  

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.relationships.category.data.id === activeCategory;
    const matchesSearch = product.attributes.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  const sortedProducts = sortProducts(filteredProducts);
  try{
    console.log(categories.map(category=>[category.attributes.name]))
  }
  catch{
    
  }
  return (
    <div>
      <Header />
      <div className="products-page">
        <h1 className="products-title">Products</h1>
        <FilterSort
          categories={categories.map(category=>[category.attributes.name])}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
        />
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <Catalog key={product.id} product={product.attributes} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;