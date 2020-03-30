import React from 'react';
import './Share.scss';
import share from "../../assets/share.svg";


function Share() {
  return (
    <div className="Share">
      <button className="Share-toggle">
        <img src={share} alt="Share Icon" className="Share-icon"/>

        Share
      </button>
      <div className="Share-body">

      </div>
    </div>
  );
}

export default Share;
