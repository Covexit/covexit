import React from 'react';
import Button from "../components/Button/Button";

function Home() {
  return (
    <div className="home">
      <Button to="/company" label="Register your business" type="primary"/>
    </div>
  );
}

export default Home;
