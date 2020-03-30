import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ to, onClick, label, secondary, type }) => {
  const classes = `Btn ${secondary && `Btn--secondary`} ${type && `Btn--${type}`}`;

  if (to)
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {label}
      </Link>
    );

  return <button onClick={onClick} className={classes}>{label}</button>;
};

export default Button
