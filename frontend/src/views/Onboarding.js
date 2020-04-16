import React  from 'react';

import './Onboarding.scss';
import ViewWrappers from '../components/ViewWrappers/ViewWrappers';
import { Route, Switch } from 'react-router-dom';
import PhotoSelect from './Onboarding/PhotoSelect';
import FirstProduct from './Onboarding/FirstProduct';

const Onboarding = (props) => {
  const match = props.match;

  return (
    <ViewWrappers.View withPadding>
      <Switch>
        {/* create a business */}
        <Route path={`${match.path}/product`} component={FirstProduct} />
        {/* initial view */}
        <Route path={match.path} component={PhotoSelect}/>
      </Switch>
    </ViewWrappers.View>
  );
};

export default Onboarding

