import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const CartPage = () => {
  const products = sessionStorage.getItem('product')
  const array = JSON.parse("[" + products + "]");
  console.log(array)
  return (
    <div>
      <Header />
      <div>CartPage</div>
      {array[0].map((product)=>(
        <div>
          <img src={product.attributes.image}/>
          <p>{product.attributes.product_name}</p>
          <p>{product.attributes.price}</p>
        </div>  
      ))}
      <Footer />
    </div>
  );
};

export default CartPage;
