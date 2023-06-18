import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:8000/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: login, password: password})
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token){
          sessionStorage.setItem('token', data.token)
          sessionStorage.setItem('user', login)
          alert('Login successful!');
          navigate('products');
        }
        else {
          setErrorMessage('Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('An error occured. Please try again.');
      });
    
    setLogin('');
    setPassword('');
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="form-container">
        <h1>Log in</h1>
        <div>Don't have an account? <Link to='/register'>Register here</Link>!</div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            className="form-input" />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-input" />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <div>Need help? <Link to='/contact'>Contact us</Link>!</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
