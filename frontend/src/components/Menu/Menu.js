import React, { useState } from 'react';
import './Menu.scss';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { useUserContext } from 'context/UserContext';


function Menu({ partner }) {
  let links;
  const [menuOpen, setMenuOpen] = useState(false);
  const [t] = useTranslation(['menu', 'account']);
  const { isAuthenticated, logoutSuccess } = useUserContext();

  if (partner.name)
    links = [
      <NavLink to={`/stores/${partner.id}/`}>{t('menu:products')}</NavLink>,
      <NavLink to={`/stores/${partner.id}/orders`}>{t('menu:orders')}</NavLink>,
    ];
  else
    links = [
      <a href="https://covexit.webflow.io/">{t('menu:howItWorks')}</a>,
      <NavLink to={`/stores`}>{t('menu:explore')}</NavLink>,
      <Button to="/stores/new" label={t('menu:merchantSignUp')} type="small"/>
    ];

  const loginField = <Button to="/login" label={t('account:login')} type="small"/>;
  const logoutField = <Button onClick={() => logoutSuccess()} to="/" label={t('account:logout')} type="small"/>;

  return (
    <nav className={`Menu Menu--${menuOpen ? 'opened' : 'closed'}`}>
      <button className="Menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="Menu-icon"/>
        Menu
      </button>
      <div className="Menu-body">
        <ul className="Menu-list">
          {links.map(component => <li className="Menu-list-item Menu-link" key={component}>{component}</li>)}
          <li className="Menu-list-item Menu-link">
            {isAuthenticated ? logoutField : loginField}
          </li>
        </ul>
        <div className="Menu-footer">© 2020 Covexit</div>
      </div>
    </nav>
  );
}

export default Menu;
