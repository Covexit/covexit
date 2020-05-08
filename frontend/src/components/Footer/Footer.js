import React, { useState } from "react";
import "./Footer.scss";
import EnlistModal from "../EnlistModal/EnlistModal";
import logo from "assets/logo.svg";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Footer() {
  const [t] = useTranslation('menu');
  const [ modalShow, setShowModal ] = useState(false);
  const links = [
    {route: '/imprint', label: t('imprint')},
    {route: '/agb', label: t('agb')},
    {route: '/privacy', label: t('privacy')},
    {route: '/about', label: t('About')},
  ];

  
  return (
    <div className="Footer">
      <div className="Footer-body">
        <Link to="/" className="Footer-logo"><img src={logo} alt="Covexit Logo"/></Link>
        <div className="Footer-copyright">&copy; 2020 Covexit</div>
        <nav>
          <ul className="Footer-links">
            {
              links.map(link => <li key={link.label} className="Footer-link"><Link to={link.route}>{link.label}</Link></li>)
            }
             <li className="Footer-link"><Link onClick={()=> setShowModal(true)}>{t('Mailing list')}</Link></li>
             {modalShow && <EnlistModal />}
          </ul>
  
        </nav>
      </div>
    </div>
  );
}

export default Footer;
