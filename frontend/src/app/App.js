import React from 'react';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../context/UserContext';

import Routes from "./Routes";
import Header from "../components/Header/Header";

import './App.scss';


const App = () => (
  <CartProvider>
    <UserProvider>
      <Header/>

      <div className="App">
        <Routes/>
      </div>
    </UserProvider>
  </CartProvider>
);

export default App
