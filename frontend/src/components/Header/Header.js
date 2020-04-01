import React from 'react';
import './Header.scss';

import logo from 'assets/logo.svg';
import Menu from "../Menu/Menu";
import Share from "../Share/Share";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      <Menu/>
      <Link to="/"><img src={logo} alt="Covexit Logo" className="Header-logo"/></Link>
      <Share/>
    </div>
  );
}

export default Header;
