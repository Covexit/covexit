import React from 'react';

import Button from 'components/Button/Button';

import "./OrderItem.scss";
import getParams from 'shared/getParams';
import { useTranslation } from 'react-i18next';

const items = { title: 'Tina Mayer', products: [
  { name: 'bread', quantity: 2, }, { name: 'tea', quantity: 1, }
], price: { incl_tax: 3.90 } };

const OrderItem = ({ location, match: { params } }) => {
  const [t] = useTranslation('order');
  const { orderId, id } = getParams(location.pathname, '/stores/:id/orders/:orderId');
  const matchStyling = orderId === 'history' ? 'bordered' : '';
  const { title, products, price } = items;

  return (
    <div className="OrderItem">
      <div className="OrderItem-review">
      <h4>{title}</h4>
      {products.map(e =>
        <div className="OrderItem-product" key={e.name}>
        {e.quantity} x {e.name}
        </div>)}
      <h4 className="OrderItem-price">{t('inclVat')}: {price.incl_tax}€</h4>
      </div>
      <div>
        <Button type={matchStyling} to={`/stores/${id || params.id}/orders/1`} label={t('viewOrder')} />
      </div>
    </div>
  )
}

export default OrderItem;
