import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const currentDate = new Date();
  const navigate = useNavigate();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const products = sessionStorage.getItem("product");
  const array = JSON.parse("[" + products + "]");

  const [cartItems, setCartItems] = useState(array[0]);
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((product) => product.id !== id);
    setCartItems(updatedItems);
    sessionStorage.setItem("product", JSON.stringify(updatedItems));
    sessionStorage.setItem(
      "product_count",
      Number(sessionStorage.getItem("product_count")) - 1
    );
  };

  const handleIncreaseQuantity = (id) => {
    const updatedItems = cartItems.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    setCartItems(updatedItems);
    sessionStorage.setItem("product", JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (id) => {
    const updatedItems = cartItems.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: Math.max(1, product.quantity - 1),
        };
      }
      return product;
    });
    setCartItems(updatedItems);
    sessionStorage.setItem("product", JSON.stringify(updatedItems));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = {
      user: sessionStorage.getItem("user"),
      adress: adress,
      postal_code: postalCode,
      city: city,
      created_date: formattedDate,
    };
    fetch("http://localhost:8000/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        // setOrder(data.data.id)
        console.log(data.data.id);
        loadOrderItem(data.data.id);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to place order. Please try again.");
      });

    const loadOrderItem = (order_id) => {
      console.log(order_id);
      for (var i in array[0]) {
        fetch("http://localhost:8000/order-item/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            product: String(array[0][i].id),
            quantity: String(array[0][i].quantity),
            price: String(array[0][i].attributes.price),
            order: String(order_id),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert("Order placed successfuly!");
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to place order. Please try again.");
          });
      }
    };
  setAdress('')
  setCity('')
  setPostalCode('')
  sessionStorage.removeItem("product")
  sessionStorage.setItem("product_count", 0)
  navigate('/products')
  };

  const totalCost =
    cartItems.reduce(
      (sum, item) => sum + item.quantity * item.attributes.price,
      0
    ) + (cartItems.length > 0 ? 15 : 0);

  return (
    <div>
      <Header />
      <div className="cart-page">Your Cart</div>
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">Your cart is empty...</div>
      ) : (
        <>
          <>
            <table className="cart-table">
              <tbody>
                {cartItems.map((product) => (
                  <tr key={product.id}>
                    <td className="cart-img-table">
                      <img
                        className="product-image"
                        src={product.attributes.image}
                        alt={product.attributes.product_name}
                      />
                    </td>
                    <td className="product-name">
                      <p>{product.attributes.product_name}</p>
                    </td>
                    <td className="product-quantity">
                      <button
                        className="quantity-button"
                        onClick={() => handleDecreaseQuantity(product.id)}
                      >
                        <FontAwesomeIcon fontSize={15} icon={faMinus} />
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => handleIncreaseQuantity(product.id)}
                      >
                        <FontAwesomeIcon fontSize={15} icon={faPlus} />
                      </button>
                      <button className="trash-button">
                        <FontAwesomeIcon
                          fontSize={20}
                          icon={faTrash}
                          onClick={() => handleRemoveItem(product.id)}
                        />
                      </button>
                    </td>
                    <td className="product-price-table">
                      {product.quantity * product.attributes.price} zł
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="shipping-cost">Shipping: 15 zł</div>
            <div className="total-cost">
              Total:&nbsp;&nbsp;&nbsp;{totalCost} zł
            </div>
            <div className="order-form">
            <form onSubmit={handleSubmit}>
              <input
                className="order-form-input"
                type="text"
                placeholder="Street, house no."
                value={adress}
                onChange={(event) => setAdress(event.target.value)}
                required
              />
              <input
                className="order-form-input"
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                required
              />
              <input
                className="order-form-input"
                type="tel"
                placeholder="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
              />
              <button type="submit" className="place-order-button">
                Place Order
              </button>
            </form>
          </div>
          </>
          
        </>
      )}

      <Footer />
    </div>
  );
};

export default CartPage;
