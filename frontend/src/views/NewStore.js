import React, { useState } from 'react';

import './NewStore.scss';
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import { Route, Switch } from "react-router-dom";
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import PersonalForm from './NewStore/PersonalForm';
import BusinessForm from './NewStore/BusinessForm';


const NewStore = (props) => {
  const match = props.match;

  const [business, setBusiness] = useState({
    name: '', hours: '', mapsPlaceObject: '',
    address: '', zipcity: '', email: '', phone: '', website: '', desc: '',
  });


  return (
    <ViewWrappers.View withPadding>
      <Switch>
        {/* create a business */}
        <Route path={`${match.path}/business`} render={(routeProps) =>
          <BusinessForm onChange={data => setBusiness(data ? { ...business, ...data} : {})}
                        business={business} {...routeProps} />
        }/>
        {/* create an owner */}
        <Route path={`${match.path}/owner`} component={PersonalForm} />
        {/* initial view */}
        <Route path={match.path}>
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
    </ViewWrappers.View>
  );
};

export default NewStore

