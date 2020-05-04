import React from 'react';

import Button from 'components/Button/Button';

import "./OrderItem.scss";

const items = { title: 'Tina Mayer', products: [
  { name: 'bread', quantity: 2, }, { name: 'tea', quantity: 1, }
], price: { incl_tax: 3.90 } };

const OrderItem = (props) => {
  const pathName = props.location.pathname;
  const matchStyling = pathName === '/orders/history' ? 'order-history' : ''
  const addProduct = () => {}
  const { title, products, price } = items;

  return (
    <div className="OrderItem">
      <div className="OrderItem-review">
      <h4>{title}</h4>
      {products.map(e =>
        <div className="OrderItem-product" key={e.name}>
        {e.quantity} x {e.name}
        </div>)}
      <h4 className="OrderItem-price">incl. VAT: {price.incl_tax}€</h4>
      </div>
      <div>
        <Button type={matchStyling} to="/orders/overview" label="View order" onClick={() => addProduct(items)} />
      </div>
    </div>
  )
}

export default OrderItem;
