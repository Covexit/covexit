import React from 'react';

import './Onboarding.scss';
import { Route, Switch } from 'react-router-dom';
import PhotoSelect from './PhotoSelect';
import FirstProduct from './FirstProduct';


const Onboarding = () => (
  <Switch>
    {/* create first product */}
    <Route path="/stores/:id/onboarding/product" component={FirstProduct}/>
    {/* selecting a photo */}
    <Route path="/stores/:id/onboarding/" component={PhotoSelect}/>
  </Switch>
);

export default Onboarding

