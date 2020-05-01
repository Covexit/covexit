import React from "react";
import "./Footer.scss";
import logo from "assets/logo.svg";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Footer() {
  const [t] = useTranslation('menu');
  const links = [
    {route: '/imprint', label: t('imprint')},
    {route: '/tos', label: t('tos')},
    {route: '/privacy', label: t('privacy')},
  ];

  return (
    <div className="Footer">
      <div className="Footer-body">
        <Link to="/" className="Footer-logo"><img src={logo} alt="Covexit Logo"/></Link>
        <div className="Footer-copyright">&copy; 2020 Covexit</div>
        <nav>
          <ul className="Footer-links">
            {
              links.map(link => <li className="Footer-link"><Link to={link.route}>{link.label}</Link></li>)
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
