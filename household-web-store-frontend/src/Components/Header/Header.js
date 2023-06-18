import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setProductCount(sessionStorage.getItem("product_count"));
    setLoggedIn(sessionStorage.getItem("token") !== null);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

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
        {sessionStorage.getItem("product") ? (
          <Link to="/cart" className="cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
            {productCount}
          </Link>
        ) : (
          <Link className="cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
            {productCount}
          </Link>
        )}
        {loggedIn ? (
          <button className="login-btn" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <>
            <Link to="/" className="login-btn">
              Log in
            </Link>
            <Link to="/register" className="login-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
