import React, { useState } from 'react';
import './Menu.scss';
import { NavLink } from "react-router-dom";


function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/map', label: 'Map test' },
    { to: '/stores/1', label: 'Store test' },
    { to: '/imprint', label: 'Imprint', meta: true },
    { to: '/privacy', label: 'Privacy', meta: true },
  ].map(e => <li className="Menu-list-item" key={e.label}>
    <NavLink to={e.to} onClick={() => setMenuOpen(false)} className={`Menu-link ${e.meta && 'Menu-link--meta'}`}>{e.label}</NavLink>
  </li>);

  return (
    <nav className={`Menu Menu--${menuOpen ? 'opened' : 'closed'}`}>
      <button className="Menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="Menu-icon"/>
        Menu
      </button>
      <div className="Menu-body">
        <ul className="Menu-list">
          {links}
        </ul>
        <div className="Menu-footer">© 2020 Covexit</div>
      </div>
    </nav>
  );
}

export default Menu;
