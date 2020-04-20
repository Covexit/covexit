import { useState, useEffect, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocationContext } from './useCurrentLocation';


const useHomeLocationQuery = () => {
  const { setCurrentLocation, coordinates } = useLocationContext()
  const [requestLocation, setRequestLocation] = useState(false)
  const { push } = useHistory();

  const handleGeoLocation = useCallback((e) => {
    e.preventDefault();
    setCurrentLocation();
    setRequestLocation(true);
  },[setCurrentLocation])

  useEffect(() => {
    (requestLocation && coordinates.length) && push('/stores');
  }, [coordinates, requestLocation, push])

  return useMemo(() => [handleGeoLocation], [handleGeoLocation]);
};

export default useHomeLocationQuery;
