import React, { useState } from 'react';
import './Menu.scss';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [t] = useTranslation('menu');

  const links = [
    { to: 'https://covexit.webflow.io/', label: t('howItWorks'), external: true },
    { to: '/order/0', label: t('order') },
    { to: '/stores/1/company', label: t('company') },
    { to: '/stores/1/onboarding/0', label: t('onboarding') },
    { to: '/imprint', label: t('imprint'), meta: true },
    { to: '/privacy', label: t('privacy'), meta: true },
  ];

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
        </ul>
        <div className="Menu-footer">© 2020 Covexit</div>
      </div>
    </nav>
  );
}

export default Menu;
