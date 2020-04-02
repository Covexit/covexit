import React, { useState } from 'react';

import './NewStore.scss';
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import { Route, Switch } from "react-router-dom";
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import PersonalForm from './NewStore/PersonalForm';
import BusinessForm from './NewStore/BusinessForm';


const getItemFromAddress = (wantedType, haystack) => {
  const needle = haystack.find(item => item.types.some(type => type === wantedType))
  return needle ? needle.long_name : '';
};

const NewStore = (props) => {
  const match = props.match;

  const [business, setBusiness] = useState({
    name: '', hours: '', mapsPlaceObject: '',
    address: '', zipcity: '', email: '', phone: '', website: '', desc: '',
  });
  const [person, setPerson] = useState({
    name: '', surname: '', address: '', phone: '', zipcity: '', email: '' });

  const onChange = (event, action) => {
    if (action === 'person')
      setPerson({ ...person, [event.target.name]: event.target.value });
    else if (action === 'resetPlacesApi')
      setBusiness({ ...business, mapsPlaceObject: ''});
    else if (action === 'placesApi')
      setBusiness({ ...business, website: event.website,
        name: event.structured_formatting && event.structured_formatting.main_text,
        phone: event.formatted_phone_number,
        address: getItemFromAddress('route', event.address_components) + ' ' +
          getItemFromAddress('street_number', event.address_components),
        zipcity: getItemFromAddress('postal_code', event.address_components) + ' ' +
          getItemFromAddress('locality', event.address_components),
        mapsPlaceObject: event });
    else
      setBusiness({ ...business, [event.target.name]: event.target.files || event.target.value, });
  };

  return (
    <ViewWrappers.View withPadding>
      <Switch>
        {/* create a business */}
        <Route path={`${match.path}/business`} render={(routeProps) =>
          <BusinessForm onChange={onChange} business={business} {...routeProps} />
        }/>
        {/* create an owner */}
        <Route path={`${match.path}/owner`}>
          <PersonalForm onChange={onChange} person={person} />
        </Route>
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

