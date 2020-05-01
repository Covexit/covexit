import React from "react";
import "./Footer.scss";
import logo from "assets/logo.svg";
import { Link } from "react-router-dom";
import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  return (
    <div className="Footer">
      <Link to="/" className="Footer-logo"><img src={logo} alt="Covexit Logo" /></Link>
      <div className="Footer-copyright"><FaRegCopyright /> 2020 Covexit</div>
      <Link to="/" className="Footer-link"></Link>
    </div>
  );
}

export default Footer;
