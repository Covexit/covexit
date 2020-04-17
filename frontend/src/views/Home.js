import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button/Button';
import ViewWrappers from "../components/ViewWrappers/ViewWrappers";
import Map from "../components/Map/Map";
import { useLocationContext } from '../context/useCurrentLocation';

import './Home.scss';

const Home = () => {
  const { setCurrentLocation, coordinates } = useLocationContext()
  const [requestLocation, setRequestLocation] = useState(false)
  const { push } = useHistory();

  const handleGeoLocation = (e) => {
    e.preventDefault();
    setCurrentLocation();
    setRequestLocation(true);
  }

  useEffect(() => {
    (requestLocation && coordinates.length) && push('/stores');
  }, [coordinates, requestLocation, push])

  return (
    <ViewWrappers.View>
      <ViewWrappers.ViewSplitter small>
        <div className="Home">
          <div className="Intro">
            <h1>Support your favourite local store online.</h1>
            <p>Covexit enables small businesses to create an easy-to-use online shop to be able to master the corona crisis.</p>
          </div>
  
          <div className="Btn-group">
            <Button onClick={handleGeoLocation} to="/stores" label="Search for shops nearby!" />
            <Button to="/stores/new" label="Register your business" secondary />
          </div>
        </div>
      </ViewWrappers.ViewSplitter>
      <ViewWrappers.ViewSplitter omitOnMobile>
        <Map/>
      </ViewWrappers.ViewSplitter>
    </ViewWrappers.View>
  );
}

export default Home
