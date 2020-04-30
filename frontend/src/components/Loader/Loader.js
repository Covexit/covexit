import React from 'react';
import './Loader.scss';

function Loader({children}) {

  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const minutesDegrees =  (minute/60) *360 + 180;
  const hourDegrees = (hour/24) *360;
  const hourStyle = {transform: ` rotateZ(${hourDegrees}deg)`}
  const minuteStyle = {transform: ` rotateZ(${minutesDegrees}deg)`}

  return (
    <div className="Loader-body">
      <div className="Message">{children}</div>
        <div className="Loader">
          <div className="hand hour" style={hourStyle} />
          <div className="hand minute" style={minuteStyle} />
        </div>
    </div>

  );
}

export default Loader;
