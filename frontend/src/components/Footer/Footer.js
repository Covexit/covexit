import React from "react";
import "./Footer.scss";
import EnlistModal from "../EnlistModal/EnlistModal";
import logo from "assets/logo.svg";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const social = [
  { icon: <FaTwitter size="25"/>, route: 'https://twitter.com/covexit' },
  { icon: <FaInstagram size="25"/>, route: 'https://www.instagram.com/covexit_de/' },
  { icon: <FaLinkedin size="25"/>, route: 'https://www.linkedin.com/company/wearecovexit' },
  { icon: <FaFacebook size="25"/>, route: 'https://www.facebook.com/Covexit/' },
];

function Footer() {
  const [t] = useTranslation('menu');
  const links = [
    {route: '/imprint', label: t('imprint')},
    {route: '/agb', label: t('agb')},
    {route: '/privacy', label: t('privacy')},
    {label: t('Mailing list')},
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
          </ul>
          <ul className="Footer-links Footer-links--social">
            {
              social.map(link => <li key={link.label} className="Footer-link"><a href={link.route}>{link.icon}</a></li>)
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
