import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-column">
        <h2 className="footer-column-title">Navigation</h2>
        <nav className="footer-nav">
          <ul>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/">Log in</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-column footer-column2">
        <h2 className="footer-column-title">Contact Us</h2>
        <nav className="footer-nav">
          <ul>
            <li>
              <a>Zakładowa 138, Wrocław</a>
            </li>
            <li>
              <a>111 222 333</a>
            </li>
            <li>
              <a>shopping@dka.pl</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
