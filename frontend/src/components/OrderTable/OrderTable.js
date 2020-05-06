import React, { Fragment, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './OrderTable.scss';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';

function OrderTable(props) {
  const [ready, OnReady] = useState(false)
  const { id, orderId } = useParams()
  const { pathname } = useLocation()
  const [t] = useTranslation(['order-table', 'order']);

  return (
    <Fragment>
      <table className="OrderTable">
        <tbody>
        <tr>
          <th>{t('order-table:nameRow')}:</th>
          <td><h2>{props.name}</h2></td>
        </tr>
        <tr>
          <th>{t('order-table:productsRow')}:</th>
          <td>
            {props.products.map(e =>
              <div className="OrderTable-product" key={e.name}>
                {e.quantity} x {e.name}
                <span className="OrderTable-price">{e.price.toFixed(2)}€</span>
              </div>)}
          </td>
        </tr>
        <tr>
          <th>{t('order-table:addressRow')}:</th>
          <td>
            {props.street}<br/>{props.zipcity}
            {orderId && <>
              <br />
              <div className="OrderTable-mapLink">
                <Button to="/map" secondary label={t('order:viewMaps')} />
              </div>
              </>}
          </td>
        </tr>
        <tr>
          <th><h2>{t('order-table:totalRow')}</h2></th>
          <td className="OrderTable-total">
            <h2>{props.products.reduce((prev, current) => prev.price + current.price).toFixed(2)}€</h2>
            <p>{t('order-table:VAT')}</p>
          </td>
        </tr>
        </tbody>
      </table>
      {orderId &&<div className="OrderTable-confirm">
        <Button onClick={() => OnReady(true)} to={!ready ? pathname : `/stores/${id}/orders/confirm`}
          type="confirm" label={!ready ? t('order:confirm.ready') : t('order:confirm.sent')} />
      </div>
      }
    </Fragment>
  );
}

export default OrderTable;
