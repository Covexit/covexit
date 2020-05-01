import React from 'react';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../context/UserContext';
import { LocationProvider } from '../context/useCurrentLocation';

import Routes from "./Routes";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import './App.scss';
import EnlistModal from '../components/EnlistModal/EnlistModal';


const App = () => (
  <CartProvider>
    <UserProvider>
      <LocationProvider>
        <Header/>

        <div className="App">
          <EnlistModal/>
          <Routes/>
        </div>
        <Footer/>
      </LocationProvider>
    </UserProvider>
  </CartProvider>
);

export default App
