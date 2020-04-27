import { useEffect, useReducer } from 'react'
import constate from 'constate'
import logger from './Logger'
import useLocalStorage from '../shared/useLocalStorage';

export const initialState = {
  token: '',
  isAuthenticated: null,
  isVerified: false,
  enlistHide: false,
<<<<<<< HEAD
  user: null
=======
  partners: [],
  user: null,
>>>>>>> 21245e5ff54211eabbe46f2350badf8c5e18fb2c
};

const reducer = (state, action) => {

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {...state.user, ...action.payload.user },
        token: action.data.token,
        partners: action.data.partners,
        isAuthenticated: true
      };

    case 'SET_PARTNERS':
      return {...state, partners: action.data};

    case 'SET_VERIFIED':
      return {...state, ...action.data, isVerified: true, isAuthenticated: true};

    case 'LOGOUT_SUCCESSFUL':
      return {
        ...initialState,
        enlistHide: state.enlistHide
      };

    case 'ENLISTHIDE':
      return {...state, enlistHide: action.data.enlistHide};

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

  const {
    user,
    token,
    partners,
    isAuthenticated,
    isVerified,
    enlistHide
  } = state;

  const setUser = (user, token, partners) => {
    dispatch({
      type: 'SET_USER',
      payload: { user },
      data: { token, partners }
    })
  };

  const setVerified = (isVerified) => {
    dispatch({
      type: 'SET_VERIFIED',
      data: { isVerified }
    })
  };

  const setPartners = (partners) => {
    dispatch({
      type: 'SET_PARTNERS',
      data: [partners].flat()
    })
  };

  const logoutSuccess = () => {
    dispatch({
      type: 'LOGOUT_SUCCESSFUL',
    })
  };

  const setEnlistHide = (enlistHide) => {
    dispatch({
      type: 'ENLISTHIDE',
      data: { enlistHide }
    })
  };

  return {
    // state
    user,
    token,
    isAuthenticated,
    isVerified,
    enlistHide,
    partners,
    // methods
    setUser,
    setPartners,
    logoutSuccess,
    setVerified,
    setEnlistHide
  }
};

export const [UserProvider, useUserContext] = constate(useUser);
