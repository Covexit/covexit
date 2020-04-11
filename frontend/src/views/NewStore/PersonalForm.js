import React, { useEffect, useRef, useState } from 'react';
import Fields from '../../components/Fields/Fields';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import API from '../../shared/api';
import { useUserContext } from '../../context/UserContext';


const PersonalForm = ({ history }) => {
  const passwordRepeat = useRef();
  const { setUser } = useUserContext();
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    zipcity: '',
    email: '',
    phone: '',
    password: '',
    password_repeat: '',
    tos: false,
    privacy: false,
  });

  useEffect(() => {
    if (data.password_repeat && data.password) {
      const passwordsMatch = data.password === data.password_repeat;
      passwordRepeat.current.setCustomValidity(passwordsMatch ? '' : 'Passwords need to match');
    }
  });

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.checked || event.target.value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await API.register.post({
      ...data, username: data.email, profile: {
        address: data.address,
        zip_and_city: data.zipcity,
        phone: data.phone,
        accepted_tos: data.tos,
        accepted_privacy_policy: data.privacy
      },
    });
    setUser({ id: response.data.user.id, email: response.data.user.email, token: response.data.token });
    history.push('/stores/new/business');
  };

  return (
    <Form onSubmit={submitHandler}
          head={<>
            <h1>Welcome!</h1>
            <p>You’ve made a great decision to register to Covexit.
              We’ll help you in the process of getting ready online.</p>
          </>}
          body={<>
            <Fields.TextInput onChange={changeHandler} placeholder="Name" name="first_name" value={data.first_name}/>
            <Fields.TextInput onChange={changeHandler} placeholder="Surname" name="last_name" value={data.last_name}/>
            <Fields.TextInput onChange={changeHandler} placeholder="Address" name="address" value={data.address}/>
            <Fields.TextInput onChange={changeHandler} placeholder="Zip and City" name="zipcity" value={data.zipcity}/>
            <Fields.TextInput onChange={changeHandler} placeholder="E-mail" name="email" type="email" value={data.email}/>
            <Fields.TextInput onChange={changeHandler} placeholder="Phone number" name="phone" value={data.phone}/>
            <Fields.PasswordInput onChange={changeHandler} name="password" value={data.password} placeholder="Password"/>
            <Fields.PasswordInput onChange={changeHandler} name="password_repeat" value={data.password_repeat}
                                  placeholder="Password (repeat)" ref={passwordRepeat}/>
            <Fields.CheckBox onChange={changeHandler} name="tos" checked={data.tos} placeholder="I have read and I accept the Terms & Conditions."/>
            <Fields.CheckBox onChange={changeHandler} name="privacy" checked={data.privacy} placeholder="I have read and I accept the Privacy Policy"/>
          </>}
          footer={<Button label="Next"/>}
    />
  );
}

export default PersonalForm;
