import React, { useState } from 'react';

import './OrderForm.scss';
import gift from 'assets/gift.svg';
import Button from "../components/Button/Button";
import OrderTable from "../components/DataTable/OrderTable";
import Stepper from "../components/Stepper/Stepper";
import SteppedForm from "../components/SteppedForm/SteppedForm";


const orderTable = {name: 'Tina Mayer', street: 'Hauptstraße 45', zipcity: '78464 Konstanz', products: [
    {quantity: 1, name: 'Very great bread indeed', price: 3.45},
    {quantity: 3, name: 'Very great tea indeed', price: 10.35}
  ]};

const OrderForm = (props) => {
  const [formInput, setFormInput] = useState({});
  const match = props.match;
  const step = match.params.step;

  const steps = [
    {
      head: (<>
        <h1>Contact Details</h1>
        <p>Thank You for your support. You are a big help in fighting against
          this crisis. Follow the steps below to finish your order.</p>
      </>),
      footer: <Button label="Next" to={'/order/1'}/>,
      stepperProps: {count: 3, activeIndex: 1},
      inputs: [
        { placeholder: 'Name', name: 'name' },
        { placeholder: 'Surname', name: 'surname' },
        { placeholder: 'E-mail', type: 'email', name: 'email' },
        { placeholder: 'Phone number', name: 'phone' },
        { placeholder: 'Delivery Address', name: 'address' },
        { placeholder: 'Zip and City', name: 'zipcity' },
      ],
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

  const onChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };


  return (
    <div className={`OrderForm OrderForm--${step}`}>
      <SteppedForm {...steps[step]} onChange={onChange}/>
    </div>
  );
};

export default OrderForm

