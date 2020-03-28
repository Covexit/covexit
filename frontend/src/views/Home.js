import React from 'react';
import Button from '../components/Button/Button';

const Home = () => (
  <div className="Home">
    <div className="Home-hero">
      <h1 className="Home-heading">Two line describtion of the idea and service.</h1>
      <p className="Home-text">Just a tiny bit more explanation, since two lines probably won’t tell enough.</p>
    </div>

    <div className="Home-btns">
      <Button to="/map" label="Search for shops nearby!" />
      <Button to="/company" label="Register your business" secondary />
    </div>
  </div>
)

export default Home
