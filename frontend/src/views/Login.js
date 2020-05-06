import React, { useState } from 'react';
import './NewStore/NewStore.scss';
import Button from "components/Button/Button";
import Fields from '../components/Fields/Fields';
import Form from "components/Form/Form";
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import { useUserContext } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import useApi from '../shared/api';

const Login = ({history}) => {
  const { API } = useApi();
  const { setUser, setVerified } = useUserContext();
  const [t] = useTranslation('account');

  const [user, updateUser] = useState({
    email: "",
    password: ""
  });

  const changeHandler = event => {
    updateUser({ ...user, [event.target.name]:event.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await API.authToken.post({username: user.email, password: user.password});
    if (response.data.token){
      setUser(response.data.user, response.data.token, response.data.partners);
      setVerified(true);
      history.push('/');
    } else {
      console.error(response);
    }

  };

  return (
    <ViewWrappers.View withPadding container>
            <Form onSubmit={submitHandler}
            head={<>
              <h1>{t('login')}</h1>
                  </>}
            body= {<>
                <Fields.TextInput onChange={changeHandler}
                  placeholder={t('email')} name="email" value={user.email}/>
                <Fields.PasswordInput onChange={changeHandler}
                placeholder={t('password')} name="password" value={user.password}/>
                  </>}
            footer={<Button label={t('login')}  />}
            />
    </ViewWrappers.View>
  );
};

export default Login
