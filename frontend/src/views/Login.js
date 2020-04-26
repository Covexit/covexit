import React, { useState } from 'react';
import './NewStore.scss';
import Button from "components/Button/Button";
import Fields from '../components/Fields/Fields';
import Form from "components/Form/Form";
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import { useUserContext } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import API from '../shared/api';

const Login = ({history}) => {

  const { setUser, setVerified } = useUserContext();
  const [t] = useTranslation('new-store-business');

  const [user, updateUser] = useState({
    username: "",
    password: ""
  })

  const changeHandler = event => {
    updateUser({ ...user, [event.target.name]:event.target.value })

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hello");
    const getToken = await API.authToken.post({...user})
    let token = getToken.data.token

    const getUser = await API.users.get()
    let currentUser = getUser.data.find(x => x.username === user.username )
    
    if(token){
      setUser(currentUser, token)
      setVerified(true)
      // for now the user gets redirected to /stores, should be redirected to
      // order views
      history.push('/stores/');
    }
    else {
      console.error(getToken)
    }
  }
  return (
    <ViewWrappers.View withPadding>
            <Form onSubmit={submitHandler}
            head={<>
              <h1>{t('head')}</h1>
              <p>{t('text')}</p>
                  </>}
            body= {<>
                <Fields.TextInput onChange={changeHandler}
                  placeholder={t('email')} name="username" value={user.username}/>
                <Fields.PasswordInput onChange={changeHandler}
                placeholder={t('Passwort')} name="password" value={user.password}/>
                  </>}
            footer={<>
                <div className="Btn-group">
                  <Button label={t('Login')}  />
                </div>
                  </>}
            />
    </ViewWrappers.View>
  );
}

export default Login
