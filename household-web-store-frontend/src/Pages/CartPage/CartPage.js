import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./CartPage.css";

const CartPage = () => {
  const products = sessionStorage.getItem('product');
  const array = JSON.parse("[" + products + "]");
  console.log(array);
  return (
    <div>
      <Header />
      <div className="cart-page">Your Cart</div>
      {array[0].map((product) => (
        <div className="product">
          <img className="product-image" src={product.attributes.image} alt={product.attributes.product_name} />
          <p className="product-name">{product.attributes.product_name}</p>
          <p className="product-price">{product.attributes.price} zł</p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default CartPage;
