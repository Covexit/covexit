import React  from 'react';

import './Onboarding.scss';
import ViewWrappers from '../components/ViewWrappers/ViewWrappers';
import { Route, Switch } from 'react-router-dom';
import PhotoSelect from './Onboarding/PhotoSelect';
import FirstProduct from './Onboarding/FirstProduct';

const Onboarding = ({ match }) => {

  return (
    <ViewWrappers.View withPadding>
      <Switch>
        {/* create a business */}
        <Route path="/stores/:id/onboarding/product" component={FirstProduct} />
        {/* initial view */}
        <Route path="/stores/:id/onboarding/" component={PhotoSelect}/>
      </Switch>
    </ViewWrappers.View>
  );
};

export default Onboarding

