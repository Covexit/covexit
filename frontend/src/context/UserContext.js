import { useEffect, useReducer } from 'react'
import constate from 'constate'
import logger from './Logger'
import useLocalStorage from '../shared/useLocalStorage';

const initialState = {
  token: '',
  isAuthenticated: null,
  isVerified: false,
  enlisted: false,
  user: null,
};

const reducer = (state, action) => {

  switch (action.type) {
    case 'SET_USER':
      return {...state, user: {...state.user, ...action.payload.user }, token: action.data.token, isAuthenticated: true};

    case 'SET_VERIFIED':
    case 'LOGIN_SUCCESSFUL':
      return {...state, ...action.data, isAuthenticated: true};

    case 'LOGOUT_SUCCESSFUL':
      return {...state, token: null, user: null,
        isAuthenticated: false};

    case 'ENLIST':
      return {...state, enlisted: action.data.enlisted};

    default:
      return state;
  }
};

const loggerReducer = logger(reducer);

const useUser = () => {
  const [data, setData] = useLocalStorage('user', initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state)
  }, [state, setData]);

  const { user, token, isAuthenticated, isVerified, enlisted } = state;

  const setUser = (user, token) => {
    dispatch({
      type: 'SET_USER',
      payload: { user },
      data: { token }
    })
  };

  const setVerified = (isVerified) => {
    dispatch({
      type: 'SET_VERIFIED',
      data: { isVerified }
    })
  };

  const loginSuccess = (user, token) => {
    dispatch({
      type: 'LOGIN_SUCCESSFUL',
      data: { token }
    })
  };

  const logoutSuccess = () => {
    dispatch({
      type: 'LOGOUT_SUCCESS',
    })
  };

  const enlist = (enlisted) => {
    dispatch({
      type: 'ENLIST',
      data: { enlisted }
    })
  };

  return { user, token, isAuthenticated, isVerified, enlisted, setUser, loginSuccess, logoutSuccess, setVerified, enlist }
};

export const [UserProvider, useUserContext] = constate(useUser);
