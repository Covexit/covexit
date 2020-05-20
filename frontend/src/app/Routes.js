import { Route, Switch } from 'react-router-dom'
import React from "react"
import NoMatch from "views/NoMatch"
import Home from "views/Home"
import OrderForm from "../views/OrderForm";
import Onboarding from "../views/Onboarding/Onboarding";
import NewStore from "../views/NewStore/NewStore";
import Orders from "../views/Orders/Orders";
import Stores from '../views/Stores';
import Verify from '../views/Verify';
import Login from '../views/Login'
import ProductCreateEdit from '../views/ProductCreateEdit';
import createTextPage from '../views/TextPage';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

function Routes() {
  return (
    <Switch>
      <Route path="/stores/new" component={NewStore} />
      <PrivateRoute path="/stores/:id/orders" component={Orders} />
      <PrivateRoute path="/stores/:id/product/:editId?" component={ProductCreateEdit} />
      <PrivateRoute path="/stores/:id/onboarding/" component={Onboarding} />
      <Route path="/stores" component={Stores} />
      <Route path="/order/:step" component={OrderForm} />
      <Route path="/verify/:id/:verificationKey/:type" component={Verify} />
      <Route path="/login" component={Login} />
      <Route exact path="/imprint" component={createTextPage('imprint')} />
      <Route exact path="/agb" component={createTextPage('agb')} />
      <Route exact path="/privacy" component={createTextPage('privacy')} />
      <Route exact path="/about" component={createTextPage('about')} />
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  )
}

export default Routes
