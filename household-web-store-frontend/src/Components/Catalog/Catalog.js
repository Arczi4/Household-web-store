import React from 'react';
import './Catalog.css';

const Catalog = ({ product }) => {
  const { product_name, price } = product.attributes;

  return (
    <div className="catalog-container">
      <img src={product_name.image} className="catalog-image" alt={product_name} />
      <div className="catalog-info">
        <h3 className="catalog-title">{product_name}</h3>
        <p className="catalog-price">{price} zł</p>
      </div>
    </div>
  );
};

export default Catalog;