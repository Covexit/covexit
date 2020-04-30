import React from 'react';
import './Loader.scss';

function Loader({children}) {

  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const hourDelay = (1 / 3) * hour + 2;
  const minutesDelay =  (1 / 30) * minute + 1;
  const hourStyle = {animationDelay: ` -${hourDelay}s`}
  const minuteStyle = {animationDelay: ` -${minutesDelay}s`}

  return (
    <div className="Loader">
      <div className="Loader-message h1">{children}</div>
      <div className="Loader-clock">
        <div className="hand hour" style={hourStyle} />
        <div className="hand minute" style={minuteStyle} />
      </div>
    </div>

  );
}

export default Loader;
