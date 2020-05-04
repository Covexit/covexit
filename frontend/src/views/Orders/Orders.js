import React from 'react';
import { Route, Switch } from "react-router-dom";
import OrderTable from '../../components/OrderTable/OrderTable'
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import Order from './Order';

import "./Orders.scss";
import Yippey from 'components/Yippey/Yippey';

const orderTable = {name: 'Tina Mayer', street: 'Hauptstraße 45', zipcity: '78464 Konstanz', products: [
  {quantity: 1, name: 'Very great bread indeed', price: 3.45},
  {quantity: 3, name: 'Very great tea indeed', price: 10.35}
]};

const Orders = (props) => {
  const match = props.match;

  return (
    <div className="Orders">
      <Switch>
        {/* an order overview */}
        <Route path={`${match.path}/overview`}>
          <ViewWrappers.View container withPadding>
            <div>
              <h1 className="Orders-heading">Order Overview</h1>
              <OrderTable {...orderTable} />
            </div>
          </ViewWrappers.View>
        </Route>
        <Route path="/orders/confirm">
          <Yippey text="Tina will be more than happy" container />
        </Route>
        {/* initial view */}
        <Route path={match.path || `${match.path}/history`}>
          <section>
            <h1 className="Orders-heading Orders-heading-pl">Orders</h1>
            <Order {...props} />
          </section>
        </Route>
      </Switch>
    </div>
  );
};

export default Orders

