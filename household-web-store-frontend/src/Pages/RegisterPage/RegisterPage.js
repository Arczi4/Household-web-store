import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

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
            <h1> RegisterPage</h1>
            <form onSubmit={handleSubmit}>
            <label>
                Login:
                <input
                type="text"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
            </form>
            <Footer />
        </div>
        );
    }

export default RegisterPage