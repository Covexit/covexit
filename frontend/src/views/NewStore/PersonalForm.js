import React from 'react';
import Fields from '../../components/Fields/Fields';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';


const PersonalForm = ({ person, onChange }) => {
  const emitOnChange = (event) => {
    return onChange({ [event.target.name]: event.target.value })
  };
  return (
    <Form
      head={<>
        <h1>Welcome!</h1>
        <p>You’ve made a great decision to register to Covexit.
          We’ll help you in the process of getting ready online.</p>
      </>}
      body={<>
        <Fields.TextInput onChange={emitOnChange} placeholder="Name" name="name" value={person.name}/>
        <Fields.TextInput onChange={emitOnChange} placeholder="Surname" name="surname" value={person.surname}/>
        <Fields.TextInput onChange={emitOnChange} placeholder="Address" name="address" value={person.address}/>
        <Fields.TextInput onChange={emitOnChange} placeholder="Zip and City" name="zipcity" value={person.zipcity}/>
        <Fields.TextInput onChange={emitOnChange} placeholder="E-mail" name="email" value={person.email}/>
        <Fields.TextInput onChange={emitOnChange} placeholder="Phone number" name="phone" value={person.phone}/>
      </>}
      footer={<Button label="Next" to={`/stores/new/business`}/>}
    />
  );
}

export default PersonalForm;
