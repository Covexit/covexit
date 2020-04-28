import React  from 'react';

import './Onboarding.scss';
import ViewWrappers from '../components/ViewWrappers/ViewWrappers';
import { Route, Switch } from 'react-router-dom';
import PhotoSelect from './Onboarding/PhotoSelect';
import ProductForm from '../components/ProductForm/ProductForm';

const Onboarding = ({ match }) => {

  return (
    <ViewWrappers.View withPadding>
      <Switch>
        {/* create first product */}
        <Route path="/stores/:id/onboarding/product" component={ProductForm} />
        {/* selecting a photo */}
        <Route path="/stores/:id/onboarding/" component={PhotoSelect}/>
      </Switch>
    </ViewWrappers.View>
  );
};

export default Onboarding

