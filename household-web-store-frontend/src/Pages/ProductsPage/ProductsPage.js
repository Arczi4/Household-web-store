import { Link } from 'react-router-dom';
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

  // sessionStorage.clear()
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
          'Authorization': `Token ${sessionStorage.getItem('token')}`
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
          'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories from the API');
      }

      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error(error);
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

  const handleResetCategory = () => {
    setActiveCategory('All');
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case 'name':
        return products.sort((a, b) => a.attributes.product_name.localeCompare(b.attributes.product_name));
      case 'priceAsc':
        return products.sort((a, b) => a.attributes.price - b.attributes.price);
      case 'priceDesc':
        return products.sort((a, b) => b.attributes.price - a.attributes.price);
      case 'ratingAsc':
        return products.sort((a, b) => a.attributes.rating - b.attributes.rating);
      case 'ratingDesc':
        return products.sort((a, b) => b.attributes.rating - a.attributes.rating);
      default:
        return products;
    }
  };
  
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' ||
      categories.find((category) => category.attributes.name === activeCategory)?.id ===
      product.relationships.category.data.id;
    const matchesSearch = product.attributes.product_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div>
      <Header />
      <div className="products-page">
        <h1 className="products-title">Products</h1>
        <FilterSort
          categories={categories.map((category) => category.attributes.name)}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onResetCategory={handleResetCategory}
        />
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-link no-link-style">
            <Catalog product={product.attributes} />
          </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
