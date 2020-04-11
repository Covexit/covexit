import React from 'react';
import { CartProvider } from '../context/CartContext'

import Routes from "./Routes";
import Header from "../components/Header/Header";

import './App.scss';

const App = () => (
  <CartProvider>
    <Header />

    <div className="App">
      <Routes />
    </div>
  </CartProvider>
)

export default App
