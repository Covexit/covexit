import React from 'react';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../context/UserContext';
import { LocationProvider } from '../context/useCurrentLocation';

import Routes from "./Routes";
import Header from "../components/Header/Header";

import './App.scss';


const App = () => (
  <CartProvider>
    <UserProvider>
      <LocationProvider>
        <Header/>

        <div className="App">
          <Routes/>
        </div>
      </LocationProvider>
    </UserProvider>
  </CartProvider>
);

export default App
