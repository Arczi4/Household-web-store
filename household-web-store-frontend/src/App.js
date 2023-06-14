import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProductsPage from './Pages/ProductsPage/ProductsPage';
import ContactPage from './Pages/ContactPage/ContactPage';

function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={ProductsPage} />
          <Route path="/contact" component={ContactPage} />
        </Switch>
        <LoginPage />
      </div>
    </Router>
  );
};


export default App;
