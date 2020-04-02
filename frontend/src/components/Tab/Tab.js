import React from 'react';

import {
    useLocation, Link
  } from "react-router-dom";

import homeIcon from 'assets/home.svg';
import inboxIcon from 'assets/inbox.svg';

const Tab = () => {
  const location = useLocation();
  const links = [
    { url: '/stores/1', label: 'Home', image: homeIcon },
    { url: '/order-view', label: 'Order', image: inboxIcon }
  ];

  const handleFocusClass = (arg) => 
    location.pathname === arg ? 'active-tab' : 'inactive-tab';

  return(
    <section className="Tab">
      {links.map( ({url, label, image}) =>
        <Link to={url} className={`Tab-button ${handleFocusClass(url)}`} >
          <img src={image} alt="home icon" />
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
