import React from 'react';
import { Link } from 'react-router-dom';

import OrderItem from './OrderItem';

import "./Order.scss";
import Tab from 'components/Tab/Tab';

const activeOrderStyle = 'Order-category-item-active';

const Order = (props) => {
  const pathName = props.location.pathname;
  const matchPath = pathName === '/orders/history'
  return (
    <div className="Order">
      <div className="Order-category">
        <Link to="/orders" className={`Order-category-item ${!matchPath? activeOrderStyle : ''}`}>New Orders</Link>
        <Link to="/orders/history" className={`Order-category-item ${matchPath? activeOrderStyle : ''}`}>Order History</Link>
      </div>
      <div className="OrderItems">
        <OrderItem {...props} />
        <OrderItem {...props} />
        <OrderItem {...props} />
        <OrderItem {...props} />
        <OrderItem {...props} />
      </div>
      <Tab />
    </div>
  )
}

export default Order;
