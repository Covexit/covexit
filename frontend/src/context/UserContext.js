import { useEffect, useReducer, useState } from 'react'
import constate from 'constate'
import logger from './Logger'

const initialState = {
  user: {
    email: '',
    token: '',
    id: -1
  }
};

const reducer = (originalState, action) => {
  let state = Object.assign({}, originalState);
  if (action.type === 'SET_USER') {
    state = { user: {...state.user, ...action.payload.user }}
  }

  return state;
};

const loggerReducer = logger(reducer);

const useUser = () => {
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data);

  useEffect(() => {
    setData(state)
  }, [state, setData]);

  const { user } = state;

  const setUser = user => {
    dispatch({
      type: 'SET_USER',
      payload: { user }
    })
  };


  return { user, setUser }
};

export const [UserProvider, useUserContext] = constate(useUser);
