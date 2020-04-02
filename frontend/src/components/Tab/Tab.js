import React from 'react';

import {
    useLocation
  } from "react-router-dom";

import Button from 'components/Button/Button';

import homeIcon from 'assets/home.svg';
import inboxIcon from 'assets/inbox.svg';

const Tab = () => {
  const location = useLocation();
  const locationUrls = ['/stores/1', '/order-view'];

  const handleFocusClass = (arg) => 
    location.pathname == arg ? 'active-tab' : 'inactive-tab';

  return(
    <section className="Tab">
      <Button type="group" to="/stores/1" type={handleFocusClass(locationUrls[0])} >
        <img src={homeIcon} alt="home icon" />
        <p>Home</p>
      </Button>
      <Button type="group" to="/order-view" type={handleFocusClass(locationUrls[1])}>
        <img src={inboxIcon} alt="inbox icon" />
        <p>Order</p>
      </Button>
    </section>
  );
}

Tab.defaultProps = {
  home: false
}

export default Tab;
