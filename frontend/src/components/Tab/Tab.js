import React from 'react';

import {
    useLocation, Link
  } from "react-router-dom";

import { ReactComponent as HomeIcon } from 'assets/home.svg';
import { ReactComponent as InboxIcon } from 'assets/inbox.svg';

const Tab = () => {
  const location = useLocation();
  const links = [
    { url: '/stores/1/company', label: 'Home', image: <HomeIcon /> },
    { url: '/order-view', label: 'Order', image: <InboxIcon /> }
  ];

  const handleFocusClass = (arg) => 
    location.pathname === arg ? 'Tab-button-active' : '';

  return(
    <section className="Tab">
      {links.map( ({url, label, image}) =>
        <Link to={url} className={`Tab-button ${handleFocusClass(url)}`} >
          {image}
          <p>{label}</p>
        </Link>
      )}
    </section>
  );
}

Tab.defaultProps = {
  home: false
}

export default Tab;
