import './App.css';
import { LoginPage } from './Screens/LoginPage/LoginPage';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProductsPage } from './Screens/ProductsPage/ProductsPage';
import { ContactPage } from './Screens/ContactPage/ContactPage';

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
