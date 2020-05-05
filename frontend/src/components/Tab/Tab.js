import React from 'react';

import { useLocation, useRouteMatch,  Link } from "react-router-dom";

import { FiHome } from 'react-icons/fi';
import { FiInbox } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Tab = () => {
  const [t] = useTranslation('owner-tabs');
  const location = useLocation();
  const match = useRouteMatch();
  const links = [
    { url: `/stores/${match.params.id}`, label: t('home'), image: <FiHome size={25} /> },
    { url: '/order-view', label: t('order'), image: <FiInbox size={25}  /> }
  ];

  const handleFocusClass = (arg) =>
    location.pathname === arg ? 'Tab-button--active' : '';

  return(
    <section className="Tab">
      {links.map( ({url, label, image}) =>
        <Link to={url} key={label} className={`Tab-button ${handleFocusClass(url)}`} >
          {image}
          <p>{label}</p>
        </Link>
      )}
    </section>
  );
}

export default Tab;
