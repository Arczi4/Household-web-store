import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const products = sessionStorage.getItem('product');
  const array = JSON.parse("[" + products + "]");

  const [cartItems, setCartItems] = useState(array[0]);

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter(product => product.id !== id);
    setCartItems(updatedItems);
    sessionStorage.setItem('product', JSON.stringify(updatedItems));
    sessionStorage.setItem('product_count', Number(sessionStorage.getItem('product_count')) - 1);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedItems = cartItems.map(product => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1
        };
      }
      return product;
    });
    setCartItems(updatedItems);
    sessionStorage.setItem('product', JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (id) => {
    const updatedItems = cartItems.map(product => {
      if (product.id === id) {
        return {
          ...product,
          quantity: Math.max(1, product.quantity - 1)
        };
      }
      return product;
    });
    setCartItems(updatedItems);
    sessionStorage.setItem('product', JSON.stringify(updatedItems));
  };

  const totalCost = cartItems.reduce((sum, item) => sum + (item.quantity * item.attributes.price), 0) + (cartItems.length > 0 ? 15 : 0);

  return (
    <div>
      <Header />
      <div className="cart-page">Your Cart</div>
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">Your cart is empty...</div>
      ) : (
        <><><table className="cart-table">
            <tbody>
              {cartItems.map((product) => (
                <tr key={product.id}>
                  <td className="cart-img-table">
                    <img className="product-image" src={product.attributes.image} alt={product.attributes.product_name} />
                  </td>
                  <td className="product-name">
                    <p>{product.attributes.product_name}</p>
                  </td>
                  <td className="product-quantity">
                    <button className="quantity-button" onClick={() => handleDecreaseQuantity(product.id)}>
                      <FontAwesomeIcon fontSize={15} icon={faMinus} />
                    </button>
                    <span>{product.quantity}</span>
                    <button className="quantity-button" onClick={() => handleIncreaseQuantity(product.id)}>
                      <FontAwesomeIcon fontSize={15} icon={faPlus} />
                    </button>
                    <button className="trash-button">
                      <FontAwesomeIcon fontSize={20} icon={faTrash} onClick={() => handleRemoveItem(product.id)} />
                    </button>
                  </td>
                  <td className="product-price-table">
                    {product.quantity * product.attributes.price} zł
                  </td>
                </tr>
              ))}
            </tbody>
          </table><div className="shipping-cost">Shipping: 15 zł</div><div className="total-cost">Total:&nbsp;&nbsp;&nbsp;{totalCost} zł</div></><div className="order-form">
              <div>
                <input
                  type="text"
                  placeholder="First Name" 
                  required />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  required />
              </div>
              <div>
                <input
                  type="tel" 
                  placeholder="Phone Number"
                  pattern="[0-9]{9}"
                  required />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Street, house no."
                  required />
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="City"
                  required />
              </div>
              <button className="place-order-button">
                Place Order
              </button>
            </div></>
      )}

          
    


      <Footer />
    </div>
  );
};

export default CartPage;
