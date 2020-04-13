import React, { useState } from 'react';
import './Menu.scss';
import { NavLink } from "react-router-dom";


function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: 'https://covexit.webflow.io/', label: 'How it works', external: true },
    { to: '/order/0', label: 'Order test' },
    { to: '/stores/1/company', label: 'Company test' },
    { to: '/stores/1/onboarding/0', label: 'Onboarding test' },
    { to: '/imprint', label: 'Imprint', meta: true },
    { to: '/privacy', label: 'Privacy', meta: true },
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
