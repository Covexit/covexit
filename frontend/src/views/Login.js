import React, { useState } from 'react';
import './NewStore.scss';
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import ViewWrappers from "components/ViewWrappers/ViewWrappers";
import { useUserContext } from '../context/UserContext';
import API from '../shared/api';

const Login = ({history}) => {

  const { loginSuccess } = useUserContext();

  const [user, updateUser] = useState({
    username: "",
    password: ""
  })

  const changeHandler = e => {
    let _user = {...user};
    _user = { [e.target.name]: e.target.value}
    updateUser({...user, ..._user})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const getToken = await API.authToken.post({...user})
    let token = getToken.data.token
    if(token){
      loginSuccess(user, token)
      history.push('/stores/');
    }
    else {
      console.error(getToken)
    }
  }
  return (
    <ViewWrappers.View withPadding>
          {/* initial view */}
            <Form
              body= { <>
                  <label> E-mail Addresse:
                    <input onChange={changeHandler} type="email" id="email" name="username"/>
                  </label>
                  <label> Passwort:
                    <input onChange={changeHandler} className="TextInput" type="password" id="password" name="password"/>
                  </label>
            </>}
              footer={<>
                <div className="Btn-group">
                  <Button onClick={submitHandler} label={('Login')}  />
                </div>
              </>}
            />
    </ViewWrappers.View>
  );
}

export default Login
