import React, { useEffect, useRef, useState } from 'react';
import Fields from '../../components/Fields/Fields';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import API from '../../shared/api';
import { useUserContext } from '../../context/UserContext';


const PersonalForm = ({ history }) => {
  const passwordRepeat = useRef();
  const { setUser } = useUserContext();
  const [t] = useTranslation(['new-store-owner', 'account']);
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    postcode: '',
    city: '',
    email: '',
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
  });

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.checked || event.target.value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await API.register.post({ ...data, username: data.email });
    setUser({ id: response.data.user.id, email: response.data.user.email }, response.data.token);
    history.push('/stores/new/business');
  };

  return (
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
            <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:email')} name="email" type="email" value={data.email}/>
            <Fields.TextInput onChange={changeHandler} placeholder={t('new-store-owner:phoneNumber')} name="phone" value={data.phone}/>
            <Fields.PasswordInput onChange={changeHandler} name="password" value={data.password} placeholder={t('account:password')}/>
            <Fields.PasswordInput onChange={changeHandler} name="password_repeat" value={data.password_repeat}
                                  placeholder={t('account:passwordRepeat')} ref={passwordRepeat}/>
            <Fields.CheckBox onChange={changeHandler} name="accepted_tos" checked={data.accepted_tos}
                             placeholder={t('account:tos')}/>
            <Fields.CheckBox onChange={changeHandler} name="accepted_privacy_policy" checked={data.accepted_privacy_policy}
                             placeholder={t('account:privacy')}/>
          </>}
          footer={<Button label={t('Next')}/>}
          stepperProps={{count: 4, activeIndex:1}}
    />
  );
}

export default PersonalForm;
