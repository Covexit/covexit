import { Route, Switch } from "react-router-dom"
import React from "react"
import NoMatch from "views/NoMatch"
import Home from "views/Home"
import PhotoSelect from "views/Onboarding/PhotoSelect"
import OrderForm from "../views/OrderForm";
import Onboarding from "../views/Onboarding";
import NewStore from "../views/NewStore";
import Stores from '../views/Stores';
import Verify from '../views/Verify';
import Login from '../views/Login'
import ProductForm from '../components/ProductForm/ProductForm';

function Routes() {
  return (
    <Switch>
      <Route path="/stores/new" component={NewStore} />
      <Route path="/stores/:id/product/:editId?" component={ProductForm} />
      <Route path="/stores/:id/onboarding/" component={Onboarding} />
      <Route path="/stores" component={Stores} />
      <Route path="/company/photo-select" component={PhotoSelect} />
      <Route path="/order/:step" component={OrderForm} />
      <Route path="/verify/:id/:token/:type" component={Verify} />
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  )
}

export default Routes
