import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const [productCount, setProductCount] = useState(0)
  
  useEffect(() => {
    setProductCount(sessionStorage.getItem('product_count'))
  }, []);

  return (
    <div className="header">
      <div className="logo-container">
        <a className="logo">DKA</a>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="right-section">
        <Link to="/cart" className="cart-icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          {productCount}
        </Link>
        <Link to="/" className="login-btn">
          Log in
        </Link>
        <Link to="/register" className="login-btn">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Header;
