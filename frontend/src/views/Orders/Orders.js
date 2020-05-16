import React from 'react';
import { Route, Switch, matchPath, useHistory } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import OrderTable from '../../components/OrderTable/OrderTable'
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import Order from './Order';

import "./Orders.scss";
import Yippey from 'components/Yippey/Yippey';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import ButtonWithImage from '../../components/ButtonWithImage/ButtonWithImage'

const style = { flexGrow: 0 };

const orderTable = {name: 'Tina Mayer', street: 'Hauptstraße 45', zipcity: '78464 Konstanz', products: [
  {quantity: 2, name: 'Seife', price: 3.45},
  {quantity: 1, name: 'Toilettenpapier', price: 10.35}
]};

const Orders = (props) => {
  const history = useHistory();
  const [t] = useTranslation('order');
  const pathMatch = matchPath(props.location.pathname, { path: '/stores/:id/orders/:orderId' });
  const match = props.match;

  return (
    <ViewWrappers.View className="Orders" container>
      <Switch>
        <Route path={`${match.path}/confirm`}>
          <Yippey text={t('finish.text')} footer={<Button label={t('finish.next')} secondary to={`/stores/${match.params.id}/orders`}/>}/>
        </Route>
        {/* an order overview and history */}
        <Route path={`${match.path}/:orderId`}>
          {pathMatch && pathMatch.params.orderId !== 'history' ?
          <div className="Order-overview View--padded">
            <div className="Order-overview-header">
              <h1 style={style} className="Orders-heading">{t('orderOverview')}</h1>
              <ButtonWithImage
                onClick={() => history.goBack()}
                label='back'
                icon={<ArrowLeft color='#C2C2C2' size={15} />}
                labelStyles={{
                  color: '#C2C2C2'
                }}
              />
            </div>
            <OrderTable {...orderTable} />
          </div>
          : <>{/* order history */}
            <h1 style={style} className="Orders-heading Orders-heading-pl">{t('orders')}</h1>
            <Order {...props} />
          </>}
        </Route>
        {/* initial view */}
        <Route path={match.path}>
          <h1 style={style} className="Orders-heading Orders-heading-pl">{t('orders')}</h1>
          <Order {...props} />
        </Route>
      </Switch>
    </ViewWrappers.View>
  );
};

export default Orders

