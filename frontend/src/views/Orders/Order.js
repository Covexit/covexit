import React from 'react';
import { Link, useParams } from 'react-router-dom';

import OrderItem from 'components/OrderItem/OrderItem';
import "./Order.scss";
import Tab from 'components/Tab/Tab';
import { useTranslation } from 'react-i18next';

const activeOrderStyle = 'Order-category-item--active';

const Order = (props) => {
  const [t] = useTranslation('order');
  const params = useParams();
  const { location: { pathname } } = props;
  const historyUrl = `/stores/${params.id}/orders/history`;
  const matchPath = pathname === historyUrl;

  return (
    <div className="Order">
      <div className="Order-category">
        <Link to={historyUrl.replace('/history', '')} className={`Order-category-item ${!matchPath? activeOrderStyle : ''}`}>{t('newOrders')}</Link>
        <Link to={historyUrl} className={`Order-category-item ${matchPath? activeOrderStyle : ''}`}>{t('orderHistory')}</Link>
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
