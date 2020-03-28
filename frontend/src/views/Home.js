import React from 'react';
import Button from '../components/Button/Button';

const Home = () => (
  <div className="Home">
    <div className="Intro">
      <h1>Two line description<br />of the idea and service.</h1>
      <p>Just a tiny bit more explanation, since two lines probably won’t tell enough.</p>
    </div>

    <div className="Btn-group">
      <Button to="/map" label="Search for shops nearby!" />
      <Button to="/company" label="Register your business" secondary />
    </div>
  </div>
)

export default Home
