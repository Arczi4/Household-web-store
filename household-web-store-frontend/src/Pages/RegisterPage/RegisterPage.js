import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./RegisterPage.css"

const RegisterPage = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      fetch('http://localhost:8000/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: login, password: password})
      })
        .then((response) => response.json())
        .then((data) => {
            alert('User added successfully!');
            navigate('/')
        })
        .catch((error) => {
            console.error(error);
            alert('Failed to add user. Please try again.');
        });
      
      setLogin('');
      setPassword('');
    };

    return (
        <div>
            <Header />
            <div className="register-container">
              <div className="reg-form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                placeholder="Username"
                type="text"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                className="form-input"
                />
                <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-input"
                />
            <button type="submit" className="submit-button">Submit</button>
            </form>
            <div>Need help? <Link to='/contact'>Contact us</Link>!</div>
            </div>
            </div>
            <Footer />
        </div>
        );
    }

export default RegisterPage