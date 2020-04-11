import { Route, Switch } from "react-router-dom"
import React from "react"
import NoMatch from "views/NoMatch"
import Home from "views/Home"
import PhotoSelect from "views/PhotoSelect"
import OrderForm from "../views/OrderForm";
import Onboarding from "../views/Onboarding";
import NewStore from "../views/NewStore";
import Stores from '../views/Stores';
import ProductCreateEdit from '../views/ProductCreateEdit';
import CompanyPage from '../views/CompanyPage';

function Routes() {
  return (
    <Switch>
      <Route path="/stores/new" component={NewStore} />
      <Route exact path="/stores/:id/company" component={CompanyPage} />
      <Route path="/stores/:id/product/:id?" component={ProductCreateEdit} />
      <Route excat path="/stores/:id/onboarding/:step" component={Onboarding} />
      <Route path="/stores" component={Stores} />
      <Route path="/company/photo-select" component={PhotoSelect} />
      <Route path="/order/:step" component={OrderForm} />
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  )
}

export default Routes
