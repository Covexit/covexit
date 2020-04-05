import React, { useState } from 'react';

import './OrderForm.scss';
import gift from 'assets/gift.svg';
import Button from "../components/Button/Button";
import OrderTable from "../components/OrderTable/OrderTable";
import Form from "../components/Form/Form";
import Fields from "../components/Fields/Fields";


const orderTable = {name: 'Tina Mayer', street: 'Hauptstraße 45', zipcity: '78464 Konstanz', products: [
    {quantity: 1, name: 'Very great bread indeed', price: 3.45},
    {quantity: 3, name: 'Very great tea indeed', price: 10.35}
  ]};

const OrderForm = (props) => {
  const [formInput, setFormInput] = useState({});
  const match = props.match;
  const step = match.params.step;

  const onChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const steps = [
    {
      head: (<>
        <h1>Contact Details</h1>
        <p>Thank You for your support. You are a big help in fighting against
          this crisis. Follow the steps below to finish your order.</p>
      </>),
      footer: <Button label="Next" to={'/order/1'}/>,
      stepperProps: {count: 3, activeIndex: 1},
      body: <>
        <Fields.TextInput onChange={onChange} placeholder="Name" name="name" value={formInput.name}/>
        <Fields.TextInput onChange={onChange} placeholder="Surname" name="surname" value={formInput.surname}/>
        <Fields.TextInput onChange={onChange} placeholder="E-mail" name="email" value={formInput.email}/>
        <Fields.TextInput onChange={onChange} placeholder="Phone number" name="phone" value={formInput.phone}/>
        <Fields.TextInput onChange={onChange} placeholder="Delivery Address" name="address" value={formInput.address}/>
        <Fields.TextInput onChange={onChange} placeholder="Zip and City" name="zipcity" value={formInput.zipcity}/>
      </>,
    },
    {
      head: (<>
        <h1>Pay with Paypal</h1>
        <p>Click on the button below to proceed with PayPal.</p>
      </>),
      stepperProps: {count: 3, activeIndex: 2},
      footer: <Button label="Pay with Paypal" type="pay" to={'/order/2'}/>,
    },
    {
      head: (<>
        <h1>Order Overview</h1>
        <p>Please give your order a final check.</p>
      </>),
      body: <OrderTable {...orderTable}/>,
      stepperProps: {count: 3, activeIndex: 3},
      footer: <Button label="Buy now" type="confirm" to={'/order/3'}/>,
    },
    {
      body: <>
        <img src={gift} alt="Gift"/>
        <h1>Yippey!</h1>
        <p>Thank you for your support.<br />
          You will be notified via Email when
          your package is on the way.</p></>,
      footer: <Button label="Find More Local Shops" secondary to={'/map'}/>,
    },
  ];

  return (
    <div className={`OrderForm OrderForm--${step}`}>
      <Form {...steps[step]} />
    </div>
  );
};

export default OrderForm

