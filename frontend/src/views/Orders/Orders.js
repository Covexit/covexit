import React, { useState } from 'react';
import { Route, Switch } from "react-router-dom";
import OrderTable from '../../components/OrderTable/OrderTable'
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import Order from './Order';
import { useTranslation } from 'react-i18next';
import Yippey from 'components/Yippey/Yippey';

import "./Orders.scss";

const orderTable = {name: 'Tina Mayer', street: 'Hauptstraße 45', zipcity: '78464 Konstanz', products: [
  {quantity: 1, name: 'Very great bread indeed', price: 3.45},
  {quantity: 3, name: 'Very great tea indeed', price: 10.35}
]};

const Orders = (props) => {
  console.log('props.match', props)
  const [t] = useTranslation('order-form');
  const [formInput, setFormInput] = useState({});
  const match = props.match;
  const step = match.params.step;

  const onChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

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

