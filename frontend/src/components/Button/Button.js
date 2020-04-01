import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss';

const Button = ({ to, onClick, label, secondary, type, span }) => {
  const classes = `Btn ${secondary && `Btn--secondary`} ${type && `Btn--${type}`}`;

  // when you dont want an interactive element, like inside a label
  if (span)
    return <span className={classes}>{label}</span>;

  if (to)
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {label}
      </Link>
    );

  return <button onClick={onClick} className={classes}>{label}</button>;
};

export default Button
