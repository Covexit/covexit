import React from 'react';

import gift from '../../assets/gift.svg';

const Yippey = ({ text }) => (
  <>
    <img src={gift} alt="Gift"/>
    <h1>Yippey!</h1>
    <p>{text}</p>
  </>
)

export default Yippey

