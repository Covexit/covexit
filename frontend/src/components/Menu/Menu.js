import React, { useRef, useState } from 'react';
import './Menu.scss';
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { useUserContext } from 'context/UserContext';
import Dropdown from '../Dropdown/Dropdown';


function Menu({ partner, isAuthenticated }) {
  const links = [];
  const [menuOpen, setMenuOpen] = useState(false);
  const [t] = useTranslation(['menu', 'account']);
  const { logoutSuccess } = useUserContext();

  const menuRef = useRef();

  window.addEventListener("click", function (e) {
    if (e.target === menuRef.current) {
     setMenuOpen(false);
    }
  });

  if (isAuthenticated) {
    if (partner.id)
      links.push(
        <NavLink to={`/stores/${partner.id}/`}>{t('menu:products')}</NavLink>,
        <NavLink to={`/stores/${partner.id}/orders`}>{t('menu:orders')}</NavLink>
      );
    links.push(<Button onClick={() => logoutSuccess()} to="/" label={t('account:logout')} type="small"/>);
  } else {
    links.push(
      <a href="https://covexit.webflow.io/">{t('menu:howItWorks')}</a>,
      <NavLink to={`/stores`}>{t('menu:explore')}</NavLink>,
      <Dropdown label={t('menu:merchantSignUp')} type="small">
        <Link to="/stores/new">{t('account:signup')}</Link>
        <Link to="/login">{t('account:login')}</Link>
      </Dropdown>
    );
  }

  return (
    <nav className={`Menu Menu--${menuOpen ? 'opened' : 'closed'}`} ref={menuRef}>
      <button className="Menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="Menu-icon"/>
        Menu
      </button>
      <div className="Menu-body">
        <ul className="Menu-list">
          <li className="Menu-list-item Menu-link" onClick={() => setMenuOpen(false)}>
            <NavLink to="/about">{t('menu:About')}</NavLink>
          </li>
          {links.map((component, index) => <li className="Menu-list-item Menu-link" onClick={() => setMenuOpen(false)} key={index}>{component}</li>)}
        </ul>
        <div className="Menu-footer">© 2020 Covexit</div>
      </div>
    </nav>
  );
}

export default Menu;
