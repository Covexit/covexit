import Fields from '../../components/Fields/Fields';
import PlacesSuggest from '../../components/PlacesSuggest/PlacesSuggest';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import React from 'react';


const getItemFromAddress = (wantedType, haystack) => {
  const needle = haystack.find(item => item.types.some(type => type === wantedType))
  return needle ? needle.long_name : '';
};

const BusinessForm = ({ location, business, onChange }) => {
  const state = !location.state ? 'init' :
    location.state.useGoogle ? 'google' : 'manual';

  const emitOnChange = (event) => {
    if (event.target)
      return onChange({ [event.target.name]: event.target.value })

    if (event === false)
      return onChange(false);

    // data from places API
    const newData = {
      website: event.website,
      name: event.structured_formatting && event.structured_formatting.main_text,
      phone: event.formatted_phone_number,
      address: getItemFromAddress('route', event.address_components) + ' ' +
        getItemFromAddress('street_number', event.address_components),
      zipcity: getItemFromAddress('postal_code', event.address_components) + ' ' +
        getItemFromAddress('locality', event.address_components),
      mapsPlaceObject: event,
    };
    return onChange(newData);
  };

  const fields = <>
    <Fields.TextInput onChange={emitOnChange} placeholder="Name of your business" name="name" value={business.name}/>
    <Fields.TextInput onChange={emitOnChange} placeholder="Opening hours" name="hours" value={business.hours}/>
    <Fields.TextInput onChange={emitOnChange} placeholder="Business Address" name="address" value={business.address}/>
    <Fields.TextInput onChange={emitOnChange} placeholder="Zip and City of your business" name="zipcity" value={business.zipcity}/>
    <Fields.TextInput onChange={emitOnChange} placeholder="Business e-mail" name="email" value={business.email}/>
    <Fields.TextInput onChange={emitOnChange} placeholder="Business Phone number" name="phone" value={business.phone}/>
    <Fields.TextInput onChange={emitOnChange} placeholder="Website (if available)" name="website" value={business.website}/>
    <Fields.TextArea onChange={emitOnChange} placeholder="Short description" name="desc" value={business.desc}/>
  </>;

  const formProps = {
    head: {
      init: <><h1>Lets talk business!</h1><p>Next we want to know about your
        business. Do you want to enter it manually or import from Google Maps?
        Don't worry, you can still change it after importing.</p></>,
      google: business.mapsPlaceObject ? <><h1>Got them! Wanna change?</h1>
          <p>We’ve got all the info from your Google Business page. In case you
            want to change something – just do it.</p></>
        : // or
        <><h1>Name your business.</h1><p>By what name is your business known?
          Type in a name your customers already know or sound familiar to
          them.</p></>,
      manual: <><h1>Business Info</h1><p>Now, let’s set up your business
        account! For starters, please fill in the blanks below.</p></>,
    },
    body: {
      google: business.mapsPlaceObject ? fields :
        <PlacesSuggest onSelected={(selected) => emitOnChange(selected)}/>,
      manual: fields,
    },
    footer: {
      init: <div className="Btn-group">
        <Button label="Get store data from Google" onClick={() => onChange(false)}
                to={{ pathname: '/stores/new/business', state: { useGoogle: true } }}/>
        <Button label="Set up manually" to={{ pathname: '/stores/new/business', state: { useGoogle: false } }} secondary/>
      </div>,
      manual: <Button label="Perfect, let’s go" to="/stores/1/onboarding"/>,
      google: <Button label="Perfect, let’s go" to="/stores/1/onboarding"/>,
    },
  };

  return <Form head={formProps.head[state]} body={formProps.body[state]}
               footer={formProps.footer[state]}/>;
};

export default BusinessForm;
