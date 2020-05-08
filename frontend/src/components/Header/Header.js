import React, { useEffect, useState } from 'react';
import './Header.scss';

import logo from 'assets/logo.svg';
import Menu from "../Menu/Menu";
import Share from "../Share/Share";
import { Link } from "react-router-dom";
import { useUserContext } from 'context/UserContext';
import useApi from 'shared/api';
import { useMediaQuery } from 'react-responsive';


function Header() {
  const [partner, setPartner] = useState(false);
  const { partners, isAuthenticated } = useUserContext();
  const { API } = useApi();
  const isBigScreen = useMediaQuery({ minWidth: 960 });

  useEffect(() => {
    const getPartner = async () => {
      const response = await API.partners.get(partners[0]);
      setPartner(response.data);
    };
    if (partners.length)
      getPartner();
    else
      setPartner(false)
  }, [partners, API])

  const partnerArea = isAuthenticated && partner && isBigScreen &&(
    <div className="Header-partners">
      <div className="Header-partners-img">
        <img src={`/photos/${partner.image}`} alt=""/>
      </div>
      <div className="Header-partners-body">
        <strong>{partner.name}</strong> <br />
        {partner.addresses[0].line1}, {partner.addresses[0].postcode} {partner.addresses[0].line4}
      </div>
    </div>
  )

  return (
    <div className="Header">
      <Menu partner={partner}/>
      <Link to="/" className="Header-logo"><img src={logo} alt="Covexit - Unterstütze deine Lieblingsgeschäfte online"/></Link>
      {partnerArea}
      <Share/>
    </div>
  );
}

export default Header;
