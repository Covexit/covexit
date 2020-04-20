import React from 'react';
import Button from '../components/Button/Button';
import ViewWrappers from "../components/ViewWrappers/ViewWrappers";
import Map from "../components/Map/Map";

import './Home.scss';
import useHomeLocationQuery from 'context/useHomeLocationQuery';

const Home = () => {
  const [handleGeoLocation] = useHomeLocationQuery();

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
