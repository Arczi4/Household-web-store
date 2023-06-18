import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import ProductDetailsPage from './Pages/ProductDetailsPage/ProductDetailsPage';
import ContactPage from './Pages/ContactPage/ContactPage';
import CartPage from './Pages/CartPage/CartPage';
import NoPage from "./Pages/NoPage/NoPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
