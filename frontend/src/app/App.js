import React from 'react';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../context/UserContext';
import { LocationProvider } from '../context/useCurrentLocation';
import { ToastProvider } from '../context/ToastContext';

import Routes from "./Routes";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Toast from '../components/Toast/Toast';

import './App.scss';


const App = () => (
  <CartProvider>
    <UserProvider>
      <LocationProvider>
        <ToastProvider>
          <Header/>
          <Toast/>
          <div className="App">
            <Routes/>
          </div>
          <Footer/>
        </ToastProvider>
      </LocationProvider>
    </UserProvider>
  </CartProvider>
);

export default App
