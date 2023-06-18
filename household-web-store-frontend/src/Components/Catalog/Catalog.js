import React from 'react';
import './Catalog.css';

const Catalog = ({ product }) => {
  return (
    <div className="catalog-container">
      <img src={product.image} className="catalog-image" />
      <div className="catalog-info">
        <h3 className="catalog-title">{product.product_name}</h3>
        <p className="catalog-price">{product.price} zł</p>
        
      </div>
      <p className="catalog-rating">
            <span className="catalog-rating-icon">&#9733;</span>
            {product.rating}
        </p>
    </div>
  );
};

export default Catalog;
