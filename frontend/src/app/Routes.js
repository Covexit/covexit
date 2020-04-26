import { Route, Switch } from "react-router-dom"
import React from "react"
import NoMatch from "views/NoMatch"
import Home from "views/Home"
import PhotoSelect from "views/Onboarding/PhotoSelect"
import OrderForm from "../views/OrderForm";
import Onboarding from "../views/Onboarding";
import NewStore from "../views/NewStore";
import Stores from '../views/Stores';
import ProductCreateEdit from '../views/ProductCreateEdit';
import CompanyPage from '../views/CompanyPage';
import Verify from '../views/Verify';
import Login from '../views/Login'

function Routes() {
  return (
    <Switch>
      <Route path="/stores/new" component={NewStore} />
      <Route exact path="/stores/:id/company" component={CompanyPage} />
      <Route path="/stores/:id/product/:id?" component={ProductCreateEdit} />
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
