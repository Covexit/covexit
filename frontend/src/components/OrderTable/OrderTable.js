import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './OrderTable.scss';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';

function OrderTable(props) {
  const [ready, OnReady] = useState(false)
  const { pathname: pathName} = useLocation();
  const matchPath = pathName === '/orders/overview';

  const [t] = useTranslation('order-table');

  return (
    <Fragment>
      <table className="OrderTable">
        <tbody>
        <tr>
          <th>{t('nameRow')}:</th>
          <td><h2>{props.name}</h2></td>
        </tr>
        <tr>
          <th>{t('productsRow')}:</th>
          <td>
            {props.products.map(e =>
              <div className="OrderTable-product" key={e.name}>
                {e.quantity} x {e.name}
                <span className="OrderTable-price">{e.price.toFixed(2)}€</span>
              </div>)}
          </td>
        </tr>
        <tr>
          <th>{t('addressRow')}:</th>
          <td>
            {props.street}<br/>{props.zipcity}
            {matchPath && <>
              <br />
              <div className="view-on-maps">
                <Button to="/customer/address" secondary label="View on Maps" />
              </div>
              </>}
          </td>
        </tr>
        <tr>
          <th><h2>{t('totalRow')}</h2></th>
          <td className="OrderTable-total">
            <h2>{props.products.reduce((prev, current) => prev.price + current.price).toFixed(2)}€</h2>
            <p>{t('VAT')}</p>
          </td>
        </tr>
        </tbody>
      </table>
      {matchPath &&<div className="OrderTable-confirm">
        <Button onClick={() => OnReady(true)} to={!ready ? pathName : "/orders/confirm"} type="confirm"
          label={!ready ? "Ready for shipping" : "Mark as sent"} />
      </div>
      }
    </Fragment>
  );
}

export default OrderTable;
