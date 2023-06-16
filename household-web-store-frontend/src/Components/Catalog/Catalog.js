import React from 'react';
import img from '../../Assets/img.png';
import './Catalog.css';

const Catalog = ({ product }) => {
  const { name, price, rating } = product;

  return (
    <div className="catalog-container">
        <img src={img} className="catalog-image" />
        <div className="catalog-info">
          <h3 className="catalog-title">{name}</h3>
          <p className="catalog-title">{price} zł</p>
        </div>
        <p className="catalog-rating">
            <span className="catalog-rating-icon">&#9733;</span>
            {rating}
        </p>
      
    </div>
  );
};

export default Catalog;
