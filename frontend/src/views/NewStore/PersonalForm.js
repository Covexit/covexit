import React, { useEffect, useRef, useState } from 'react';
import Fields from '../../components/Fields/Fields';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';


const PersonalForm = ({ history }) => {
  const passwordRepeat = useRef();
  const [data, setData] = useState({
    name: '',
    surname: '',
    address: '',
    zipcity: '',
    email: '',
    phone: '',
    password: '',
    password_repeat: '',
  });

  useEffect(() => {
    if (data.password_repeat && data.password) {
      const passwordsMatch = data.password === data.password_repeat;
      passwordRepeat.current.setCustomValidity(passwordsMatch ? '' : 'Passwords need to match');
    }
  });

  const changeHandler = (event) => {
    setData({...data, [event.target.name]: event.target.value })
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
            <Fields.TextInput onChange={changeHandler} placeholder="Name" name="name" value={data.name}/>
            <Fields.TextInput onChange={changeHandler} placeholder="Surname" name="surname" value={data.surname}/>
            <Fields.TextInput onChange={changeHandler} placeholder="Address" name="address" value={data.address}/>
            <Fields.TextInput onChange={changeHandler} placeholder="Zip and City" name="zipcity" value={data.zipcity}/>
            <Fields.TextInput onChange={changeHandler} placeholder="E-mail" name="email" type="email" value={data.email}/>
            <Fields.TextInput onChange={changeHandler} placeholder="Phone number" name="phone" value={data.phone}/>
            <Fields.PasswordInput onChange={changeHandler} name="password" value={data.password} placeholder="Password"/>
            <Fields.PasswordInput onChange={changeHandler} name="password_repeat" value={data.password_repeat}
                                  placeholder="Password (repeat)" ref={passwordRepeat}/>
          </>}
          footer={<Button label="Next" />}
    />
  );
}

export default PersonalForm;
