import React from 'react';
import './Catalog.css';

const Catalog = ({ product }) => {
  return (
    <div className="catalog-container">
      <img src={product.image} className="catalog-image" />
      <div className="catalog-info">
        <h3 className="catalog-title">{product.name}</h3>
        <p className="catalog-price">{product.price} zł</p>
      </div>
    </div>
  );
};

export default Catalog;