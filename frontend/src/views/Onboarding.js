import React  from 'react';

import './Onboarding.scss';
import ViewWrappers from '../components/ViewWrappers/ViewWrappers';
import { Route, Switch } from 'react-router-dom';
import BusinessForm from './NewStore/BusinessForm';
import PersonalForm from './NewStore/PersonalForm';
import PhotoSelect from './Onboarding/PhotoSelect';

const Onboarding = (props) => {
  const match = props.match;

  return (
    <ViewWrappers.View withPadding>
      <Switch>
        {/* create a business */}
        <Route path={`${match.path}/business`} component={BusinessForm} />
        {/* create an owner */}
        <Route path={`${match.path}/owner`} component={PersonalForm} />
        {/* initial view */}
        <Route path={match.path} component={PhotoSelect}/>
      </Switch>
    </ViewWrappers.View>
  );
};

export default Onboarding

