import React, { useState } from 'react';
import './Menu.scss';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { useUserContext } from '../../context/UserContext';


function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [t] = useTranslation('menu');
  const { isAuthenticated, logoutSuccess} = useUserContext();


  const links = [
    { to: 'https://covexit.webflow.io/', label: t('howItWorks'), external: true },
    { to: '/stores', label: t('explore') },
  ];

  const logoutHandler = () => {
    logoutSuccess();
  }

  const loginField =
    <>
      <li className="Menu-list-item Menu-link">
        <Button to="/login" label={t('logIn')} type="small"/>
      </li>
    </>

  const logoutField =
  <>
    <li className="Menu-list-item Menu-link">
      <Button onClick={logoutHandler} to="/" label={t('logOut')} type="small"/>
    </li>
  </>


  return (
    <nav className={`Menu Menu--${menuOpen ? 'opened' : 'closed'}`}>
      <button className="Menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="Menu-icon"/>
        Menu
      </button>
      <div className="Menu-body">
        <ul className="Menu-list">
          {links.map(e =>
            <li className="Menu-list-item" key={e.label}>
              {(e.external && <a href={e.to} className="Menu-link">{e.label}</a>) ||
              <NavLink to={e.to} onClick={() => setMenuOpen(false)} className={`Menu-link ${e.meta && 'Menu-link--meta'}`}>{e.label}</NavLink>}
            </li>)}
            {isAuthenticated ? logoutField : loginField}
            <li className="Menu-list-item Menu-link">
              <Button to="/stores/new" label={t('merchantSignUp')} type="small"/>
            </li>
        </ul>
        <div className="Menu-footer">© 2020 Covexit</div>
      </div>
    </nav>
  );
}

export default Menu;
