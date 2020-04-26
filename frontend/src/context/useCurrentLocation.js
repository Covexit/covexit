import { useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import constate from 'constate'
import logger from './Logger'
// import useLocalStorage from '../shared/useLocalStorage'


const initialState = {
  selectedLocation: {},
  coordinates: []
};


const reducer = (originalState, action) => {
  let state = Object.assign({}, originalState);
  switch (action.type) {
    case 'SET_SELECTED_COORDINATES':
      return {
        ...state,
        coordinates: action.payload.coordinates,
        selectedLocation: {},
      }

    case 'SET_SELECTED_LOCATION':
      const { suggestion, coordinates } = action.payload;
      return {
        ...state,
        selectedLocation: suggestion,
        coordinates,
      };

    default: {
      return state;
    }
  }

};

const geoLocationOptions = {
  maximumAge: 1000,
  enableHighAccuracy: true
};
const loggerReducer = logger(reducer);

const useCurrentLocation = () => {
  // TODO: loader status:
  // const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [data, setData] = useState(initialState);
  const [state, dispatch] = useReducer(loggerReducer, data)


  useEffect(() => {
    setData(state)
  }, [state, setData])

  const { selectedLocation, coordinates } = state

  const setSelectedLocation = coordinates => {
    dispatch({
      type: 'SET_SELECTED_COORDINATES',
      payload: { coordinates }
    })
  }

  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      // TODO: loader status: setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const coordinates = [longitude, latitude];
          // TODO: loader status: setIsGettingLocation(false);
          setSelectedLocation(coordinates);
        },
        (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
        // TODO: loader status: setIsGettingLocation(false)
        geoLocationOptions
      );
    } else {
      // Browser doesn't support Geolocation
      // TODO: loader status: setIsGettingLocation(true);
      axios.get('https://ipapi.co/json/')
      .then((response) => {
        const { latitude, longitude } = response;
        const coordinates = [longitude, latitude];
        // TODO: loader status: setIsGettingLocation(false);
        setSelectedLocation(coordinates);
      })
      .catch(() => {
        // TODO: loader status: setIsGettingLocation(false);
        console.log('the geolocation service is not supported in your browser');
      });
    }
  };

  const setGoogleLocation = (suggestion, coordinates) => {
    dispatch({
      type: 'SET_SELECTED_LOCATION',
      payload: {suggestion, coordinates}
    })
  }

  return { selectedLocation, coordinates, setCurrentLocation, setGoogleLocation }
};

export const [LocationProvider, useLocationContext] = constate(useCurrentLocation);
