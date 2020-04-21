import { useEffect, useMemo } from 'react';
import { useLocationContext } from './useCurrentLocation';

const useHomeLocationQuery = () => {
  const { setCurrentLocation, coordinates } = useLocationContext()

  const mount = () => {
    setCurrentLocation();
    const unmount = () => {
      console.log('unmounted')
    }
    return unmount
  }

  useEffect(mount, []);

  return useMemo(() => coordinates, [coordinates])
};

export default useHomeLocationQuery;
