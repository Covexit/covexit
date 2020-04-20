import React from 'react';

import './NewStore.scss';
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import { Redirect, Route, Switch } from "react-router-dom";
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import PersonalForm from './NewStore/PersonalForm';
import BusinessForm from './NewStore/BusinessForm';
import WaitingForVerify from './NewStore/WaitingForVerify';
import { useUserContext } from '../context/UserContext';


const NewStore = (props) => {
  const match = props.match;
  const { isVerified, isAuthenticated } = useUserContext();

  return (
    <ViewWrappers.View withPadding>
      {!isVerified && isAuthenticated ? <WaitingForVerify /> :
        <Switch>
          {/* create a business */}
          <Route path={`${match.path}/business`} component={BusinessForm} />
          {/* create an owner */}
          <Route path={`${match.path}/owner`} render={(props) => {
            return isVerified ? <Redirect to={`${match.path}/business`} /> : <PersonalForm {...props} />
          }}/>
          {/* initial view */}
          <Route path={match.path}>
            {isVerified && <Redirect to={`${match.path}/business`} />}
            <Form
              head={<>
                <h1>Awesome decision!</h1>
                <p>We’ll guide you through the process so you have it as easy as
                  possible to bring your business online.</p>
              </>}
              footer={<>
                <div className="Btn-group">
                  <Button label="Register with google" to={{ pathname: `${match.path}/owner`, state: { useGoogle: true } }}/>
                  <Button label="Register by email" to={{ pathname: `${match.path}/owner`, state: { useGoogle: false } }} secondary/>
                </div>
              </>}
            />
          </Route>
        </Switch>
      }
    </ViewWrappers.View>
  );
};

export default NewStore

