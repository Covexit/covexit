import React, { useEffect, useRef, useState } from 'react';
import Fields from '../../components/Fields/Fields';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import { Trans, useTranslation } from 'react-i18next';
import useApi from '../../shared/api';
import ViewWrappers from '../../components/ViewWrappers/ViewWrappers';
import { Link } from 'react-router-dom';
import { apiDataTransform, apiErrorTransform } from '../../shared/apiDataTransform';


const PersonalForm = ({ history }) => {
  const passwordRepeat = useRef();
  const { API } = useApi();
  const [t] = useTranslation(['new-store-owner', 'account']);
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    postcode: '',
    city: '',
    username: '',
    phone: '',
    password: '',
    password_repeat: '',
    accepted_tos: false,
    accepted_privacy_policy: false,
  });

  useEffect(() => {
    if (data.password_repeat && data.password) {
      const passwordsMatch = data.password === data.password_repeat;
      passwordRepeat.current.setCustomValidity(passwordsMatch ? '' : t('account:passwordMatchError'));
    }
  }, [data.password, data.password_repeat, t]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.checked || event.target.value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.register.post(apiDataTransform(data));
      history.push('/stores/new/verify');
    } catch (e) {
      setData((oldState) => apiErrorTransform(oldState, e.response.data))
    }
  };

  return (
    <ViewWrappers.View container withPadding>
      <Form onSubmit={submitHandler}
            head={<>
              <h1>{t('new-store-owner:head')}</h1>
              <p>{t('new-store-owner:text')}</p>
            </>}
            body={<>
              <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:name')} name="first_name" value={data.first_name}/>
              <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:surname')} name="last_name" value={data.last_name}/>
              <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:address')} name="address" value={data.address}/>
              <Fields.FieldGroup>
                <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:zip')} name="postcode" value={data.postcode}/>
                <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:city')} name="city" value={data.city}/>
              </Fields.FieldGroup>
              <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:email')} name="username" type="email" value={data.username}/>
              <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:phoneNumber')} name="phone" value={data.phone}/>
              <Fields.PasswordInput onChange={changeHandler} name="password" value={data.password} placeholder={t('account:password')}/>
              <Fields.PasswordInput onChange={changeHandler} name="password_repeat" value={data.password_repeat}
                                    placeholder={t('account:passwordRepeat')} ref={passwordRepeat}/>
              <Fields.CheckBox onChange={changeHandler} name="accepted_tos" checked={data.accepted_tos}
                               placeholder={<Trans i18nKey="tos" ns="account">I have read and accept the <Link to="/agb/">Terms and conditions</Link>.</Trans>}/>
              <Fields.CheckBox onChange={changeHandler} name="accepted_privacy_policy" checked={data.accepted_privacy_policy}
                               placeholder={<Trans i18nKey="privacy" ns="account">I have read and accept the <Link to="/privacy/">privacy policy</Link>.</Trans>}/>
            </>}
            stepperProps={{ count: 3, activeIndex: 1 }}
            footer={<Button label={t('account:createAccount')}/>}
      />
    </ViewWrappers.View>
  );
}

export default PersonalForm;
