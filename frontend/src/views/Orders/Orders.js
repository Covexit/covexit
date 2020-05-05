import React from 'react';
import { Route, Switch } from "react-router-dom";
import OrderTable from '../../components/OrderTable/OrderTable'
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import Order from './Order';

import "./Orders.scss";
import Yippey from 'components/Yippey/Yippey';
import getParams from 'shared/getParams';
import { useTranslation } from 'react-i18next';

const style = { flexGrow: 0 };

const orderTable = {name: 'Tina Mayer', street: 'Hauptstraße 45', zipcity: '78464 Konstanz', products: [
  {quantity: 1, name: 'Very great bread indeed', price: 3.45},
  {quantity: 3, name: 'Very great tea indeed', price: 10.35}
]};

const Orders = (props) => {
  const [t] = useTranslation('order');
  const params = getParams(props.location.pathname, '/stores/:id/orders/:orderId');
  const match = props.match;

  return (
    <ViewWrappers.View className="Orders" container>
      <Switch>
        <Route path={`${match.path}/confirm`}>
          <Yippey text={t('finish.text')} />
        </Route>
        {/* an order overview and history */}
        <Route path={`${match.path}/:orderId`}>
          {params.orderId !== 'history' ?
          <div className="Order-overview View--padded">
            <h1 style={style} className="Orders-heading">{t('orderOverview')}</h1>
            <OrderTable {...orderTable} />
          </div>
          : <>{/* order history */}
            <h1 style={style} className="Orders-heading Orders-heading-pl">{t('orders')}</h1>
            <Order {...props} params={params} />
          </>}
        </Route>
        {/* initial view */}
        <Route path={match.path}>
          <h1 style={style} className="Orders-heading Orders-heading-pl">{t('orders')}</h1>
          <Order {...props} params={params} />
        </Route>
      </Switch>
    </ViewWrappers.View>
  );
};

export default Orders

