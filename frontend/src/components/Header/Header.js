import React from 'react';
import './Header.scss';

import logo from 'assets/logo.svg';
import Menu from "../Menu/Menu";
import Modal from "../Modal/Modal";
import Share from "../Share/Share";

function Header() {
  return (
    <div className="Header">
      <Menu/>
      <img src={logo} alt="Covexit Logo" className="Header-logo"/>
      <Share/>
    </div>
  );
}

export default Header;

