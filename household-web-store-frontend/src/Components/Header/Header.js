import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
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
        </Link>
        <Link to="/" className="login-btn">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Header;
