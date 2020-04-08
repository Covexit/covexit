import React, { useState } from 'react';
import Fields from '../../components/Fields/Fields';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';


const PersonalForm = ({ person, onChange }) => {
  const [data, setData] = useState({
    name: '',
    surname: '',
    address: '',
    zipcity: '',
    email: '',
    phone: '',
  });

  const changeHandler = (event) => {
    setData({...data, [event.target.name]: event.target.value })
  };

  return (
    <Form
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
        <Fields.TextInput onChange={changeHandler} placeholder="E-mail" name="email" value={data.email}/>
        <Fields.TextInput onChange={changeHandler} placeholder="Phone number" name="phone" value={data.phone}/>
      </>}
      footer={<Button label="Next" to={`/stores/new/business`}/>}
    />
  );
}

export default PersonalForm;
