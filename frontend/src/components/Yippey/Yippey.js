import React from 'react';

import gift from '../../assets/gift.svg';

import './Yippey.scss'

const Yippey = ({ text, container, footer }) => (
  <div className={`Yippey Yippey--${container ? 'container': ''}`}>
    <img src={gift} alt="Gift"/>
    <h1>Yippey!</h1>
    <p>{text}</p>
    {footer}
  </div>
)

export default Yippey

