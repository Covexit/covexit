import React, { useState } from 'react';

import './OrderForm.scss';
import gift from 'assets/gift.svg';
import Button from "../components/Button/Button";
import OrderTable from "../components/OrderTable/OrderTable";
import Form from "../components/Form/Form";
import Fields from "../components/Fields/Fields";
import { useTranslation } from 'react-i18next';


const orderTable = {name: 'Tina Mayer', street: 'Hauptstraße 45', zipcity: '78464 Konstanz', products: [
    {quantity: 1, name: 'Very great bread indeed', price: 3.45},
    {quantity: 3, name: 'Very great tea indeed', price: 10.35}
  ]};

const OrderForm = (props) => {
  const [t] = useTranslation('order-form');
  const [formInput, setFormInput] = useState({});
  const match = props.match;
  const step = match.params.step;

  const onChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const steps = [
    {
      head: (<>
        <h1>{t('address.head')}</h1>
        <p>{t('address.text')}</p>
      </>),
      footer: <Button label={t('address.button')} to={'/order/1'}/>,
      stepperProps: {count: 3, activeIndex: 1},
      body: <>
        <Fields.TextInput onChange={onChange} placeholder={t('address.name')} name="name" value={formInput.name}/>
        <Fields.TextInput onChange={onChange} placeholder={t('address.surname')} name="surname" value={formInput.surname}/>
        <Fields.TextInput onChange={onChange} placeholder={t('address.email')} name="email" value={formInput.email}/>
        <Fields.TextInput onChange={onChange} placeholder={t('address.phoneNumber')} name="phone" value={formInput.phone}/>
        <Fields.TextInput onChange={onChange} placeholder={t('address.deliveryAddress')} name="address" value={formInput.address}/>
        <Fields.TextInput onChange={onChange} placeholder={t('address.zipAndCity')} name="zipcity" value={formInput.zipcity}/>
      </>,
    },
    {
      head: (<>
        <h1>{t('pay.head')}</h1>
        <p>{t('pay.text')}</p>
      </>),
      stepperProps: {count: 3, activeIndex: 2},
      footer: <Button label={t('pay.button')} type="pay" to={'/order/2'}/>,
    },
    {
      head: (<>
        <h1>{t('overview.head')}</h1>
        <p>{t('overview.text')}</p>
      </>),
      body: <OrderTable {...orderTable}/>,
      stepperProps: {count: 3, activeIndex: 3},
      footer: <Button label={t('overview.button')} type="confirm" to={'/order/3'}/>,
    },
    {
      body: <>
        <img src={gift} alt="Gift"/>
        <h1>Yippey!</h1>
        <p>{t('finish.text')}</p></>,
      footer: <Button label={t('finish.button')} secondary to={'/map'}/>,
    },
  ];

  return (
    <div className={`OrderForm OrderForm--${step}`}>
      <Form {...steps[step]} />
    </div>
  );
};

export default OrderForm

