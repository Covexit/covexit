import Fields from '../../components/Fields/Fields';
import PlacesSuggest from '../../components/PlacesSuggest/PlacesSuggest';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios'
import useApi from '../../shared/api';
import ViewWrappers from '../../components/ViewWrappers/ViewWrappers';
import { apiErrorTransform } from '../../shared/apiDataTransform';

const getItemFromAddress = (wantedType, haystack) => {
  const needle = haystack.find(item => item.types.some(type => type === wantedType))
  return needle ? needle.long_name : '';
};

const BusinessForm = ({ location, history }) => {
  const { API } = useApi();
  const { user, setPartners } = useUserContext();
  const [t] = useTranslation('new-store-business');
  const initialState = {
    name: '',
    mail: '',
    website: '',
    phone: '',
    country: 'DE',
    line1: '',
    line4: '',
    postcode: '',
    description: '',
    vat_no: '',
    mapsPlaceObject: false,
  }

  const [data, setData] = useState(initialState);

  const changeHandler = (event) => {
    let _data = {...data, mapsPlaceObject: false};
    if (event === false)
      return setData(_data);
    if (event.target) {
      _data = { [event.target.name]: event.target.value };
    } else {
      _data = {
        name: event.structured_formatting && event.structured_formatting.main_text,
        website: event.website || '',
        phone: event.formatted_phone_number || '',
        line1: getItemFromAddress('route', event.address_components) + ' ' +
          getItemFromAddress('street_number', event.address_components),
        line4: getItemFromAddress('locality', event.address_components),
        postcode: getItemFromAddress('postal_code', event.address_components),
        mapsPlaceObject: event,
      };
    }

    setData({...data, ..._data });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let searchString = `${data.line1}, ${data.postcode} ${data.line4}`;
    const getLocation = await axios(
        `https://eu1.locationiq.com/v1/search.php?key=pk.4c61e48b53acaa5cd9ae20ab6f019f18&q=${searchString}&format=json`);
    const latitude = Number(getLocation.data[0].lat).toFixed(5);
    const longitude = Number(getLocation.data[0].lon).toFixed(5);

    try {
      const response = await API.partners.post({
        ...data, address: { ...data, latitude, longitude }, users: [user.id]
      });
      setPartners(response.data.id);
      history.push(`/stores/${response.data.id}/onboarding`);
    } catch (e) {
      if (e.response && e.response.status === 400)
        setData((oldState) => apiErrorTransform(oldState, e.response.data))
    }
  };

  const fields = <>
    <Fields.TextInput onChange={changeHandler} placeholder={t('name')} name="name" value={data.name}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('address')} name="line1" value={data.line1}/>
    <Fields.FieldGroup>
      <Fields.TextInput onChange={changeHandler} placeholder={t('city')} name="line4" value={data.line4}/>
      <Fields.TextInput onChange={changeHandler} placeholder={t('zip')} name="postcode" value={data.postcode}/>
    </Fields.FieldGroup>
    <Fields.TextInput onChange={changeHandler} placeholder={t('vatNo')} name="vat_no" value={data.vat_no}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('email')} name="mail" value={data.mail}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('phoneNumber')} name="phone" value={data.phone}/>
    <Fields.TextInput onChange={changeHandler} placeholder={t('website')} optional
                      name="website" value={data.website}/>
    <Fields.TextArea onChange={changeHandler} placeholder={t('description')} maxLength={300}
                     name="description" value={data.description}/>
  </>;

  const formProps = {
    head: data.mapsPlaceObject ? <><h1>{t('googleConfirm.head')}</h1>
          <p>{t('googleConfirm.text')}</p></>
        : // or
        <><h1>{t('searchGoogle.head')}</h1><p>{t('searchGoogle.text')}</p></>,
    body: data.mapsPlaceObject ? fields :
        <PlacesSuggest onSelected={(selected) => changeHandler(selected)}/>,
    footer: data.mapsPlaceObject ? <Button label={t('googleConfirm.continue')} />
        : <Button onClick={() => setData({...initialState, mapsPlaceObject: true})} label={t('intro.button_manually')} secondary />,
    stepperProps: data.mapsPlaceObject ? {count: 3, activeIndex:3} : {count: 3, activeIndex:2}
    }

  return <ViewWrappers.View container withPadding>
    <Form {...formProps} onSubmit={submitHandler} errors={data.non_field_errors}/>
  </ViewWrappers.View>
};

export default BusinessForm;
