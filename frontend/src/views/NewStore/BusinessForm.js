import Fields from '../../components/Fields/Fields';
import PlacesSuggest from '../../components/PlacesSuggest/PlacesSuggest';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import API from '../../shared/api';


const getItemFromAddress = (wantedType, haystack) => {
  const needle = haystack.find(item => item.types.some(type => type === wantedType))
  return needle ? needle.long_name : '';
};

const BusinessForm = ({ location, history }) => {
  const state = !location.state ? 'init' :
    location.state.useGoogle ? 'google' : 'manual';
  const { token, user } = useUserContext();
  const [t] = useTranslation('new-store-business');

  const [data, setData] = useState({
    name: '',
    mail: '',
    website: '',
    phone: '',
    country: 'DE',
    line1: '',
    line2: '',
    description: '',
    mapsPlaceObject: {},
  });

  const changeHandler = (event) => {
    let _data = {...data, mapsPlaceObject: false};

    if (event === false)
      return setData(_data);

    if (event.target) {
      _data = { [event.target.name]: event.target.value };
    } else {
      _data = {
        name: event.structured_formatting && event.structured_formatting.main_text,
        website: event.website,
        phone: event.formatted_phone_number,
        line1: getItemFromAddress('route', event.address_components) + ' ' +
          getItemFromAddress('street_number', event.address_components),
        line2: getItemFromAddress('postal_code', event.address_components) + ' ' +
          getItemFromAddress('locality', event.address_components),
        mapsPlaceObject: event,
      };
    }

    setData({ ...data, ..._data });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await API.partners.post({
      ...data, address: { ...data }, users: [user.id]
    },{headers: {'Authorization': `Token ${token}`}});
    if (response.status === 201) {
      history.push(`/stores/${response.data.id}/onboarding`);
    } else {
      console.error(response);
    }
  };

  const fields = <>
    <Fields.TextInput onChange={changeHandler} placeholder={t('name')} name="name" value={data.name}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('address')} name="line1" value={data.line1}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('zipAndCity')} name="line2" value={data.line2}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('email')} name="mail" value={data.mail}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('phoneNumber')} name="phone" value={data.phone}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('website')} optional
                      name="website" value={data.website}/>
    <Fields.TextArea onChange={changeHandler} placeholder={t('description')} optional maxLength={300}
                     name="description" value={data.description}/>
  </>;

  const formProps = {
    head: {
      init: <><h1>{t('intro.head')}</h1><p>{t('intro.text')}</p></>,
      google: business.mapsPlaceObject ? <><h1>{t('googleConfirm.head')}</h1>
          <p>{t('googleConfirm.text')}</p></>
        : // or
        <><h1>{t('searchGoogle.head')}</h1><p>{t('searchGoogle.text')}</p></>,
      manual: <><h1>{t('manually.head')}</h1><p>{t('manually.text')}</p></>,
    },
    body: {
      google: data.mapsPlaceObject ? fields :
        <PlacesSuggest onSelected={(selected) => changeHandler(selected)}/>,
      manual: fields,
    },
    footer: {
      init: <div className="Btn-group">
        <Button label={t('intro.button_google')} onClick={() => changeHandler(false)}
                to={{ pathname: '/stores/new/business', state: { useGoogle: true } }}/>
        <Button label={t('intro.button_manually')} to={{ pathname: '/stores/new/business', state: { useGoogle: false } }} secondary/>
      </div>,
      manual: <Button label={t('manually.continue')} to="/stores/1/onboarding"/>,
      google: <Button label={t('googleConfirm.continue')} to="/stores/1/onboarding"/>,
    },
  };

  return <Form head={formProps.head[state]} body={formProps.body[state]}
               onSubmit={submitHandler} footer={formProps.footer[state]}/>;
};

export default BusinessForm;
