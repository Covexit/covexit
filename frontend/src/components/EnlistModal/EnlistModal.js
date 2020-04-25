import React, { useRef, useState } from "react";
import "./EnlistModal.scss";
import { useUserContext } from '../../context/UserContext';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import Fields from '../Fields/Fields';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';

const EnlistModal = () => {
  const { enlisted } = useUserContext();
  const [ showModal, setShowModal ] = useState(true);
  const [ data, setData ] = useState({
    name: '',
    email: '',
    accepted_privacy_policy: false
  });
  const [t] = useTranslation(['waiting-list', 'new-store-owner']);

  const changeHandler = (event) => setData({...data, [event.target.name]: event.target.value });

  const submitHandler = () => {

  }

  return !enlisted && showModal && <Modal onClose={() => setShowModal(false)}>
    <Form onSubmit={submitHandler}
      head={<><h1>{t('waiting-list:head')}</h1><p className="intro">{t('waiting-list:text')}</p></>}
      body={<>
        <Fields.TextInput onChange={changeHandler} placeholder={t('waiting-list:name')} name="name" value={data.name}/>
        <Fields.TextInput onChange={changeHandler} placeholder={t('waiting-list:email')} name="email" value={data.email}/>
        <Fields.CheckBox onChange={changeHandler} name="accepted_privacy_policy" checked={data.accepted_privacy_policy}
                         placeholder={t('new-store-owner:privacy')}/>
      </>}
      footer={<>
        <Button label={t('new-store-owner:Next')}/>
        <Button label={t('waiting-list:dontShowAgain')} type="dismiss"/>
      </>}
    />
  </Modal>
};

export default EnlistModal;






