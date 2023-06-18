import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const products = sessionStorage.getItem('product');
  const array = JSON.parse("[" + products + "]");

  const handleRemoveItem = (id) =>{
    const updatedItem = array[0].filter(product=>product.id!=id)
    sessionStorage.setItem('product', JSON.stringify(updatedItem));
    sessionStorage.setItem('product_count', Number(sessionStorage.getItem('product_count'))-1);
    window.location.reload()
  }
  
  const totalCost = array[0].reduce((sum, item) => sum + (item.quantity*item.attributes.price), 0);

  return (
    <div>
      <Header />
      <div className="cart-page">Your Cart</div>
      {array[0].map((product) => (
        <div className="product">
          <img className="product-image" src={product.attributes.image} alt={product.attributes.product_name} />
          <p className="product-name">{product.attributes.product_name}</p>
          <p className="product-price">{product.attributes.price} zł</p>
          <p className="product-quantity">{product.quantity}</p>
          <button>
            <FontAwesomeIcon fontSize={20} icon={faTrash} onClick={()=>handleRemoveItem(product.id)}/>
          </button>
        </div>
      ))}
      <div>Total: {totalCost}</div>
      <Footer />
    </div>
  );
};

export default CartPage;
