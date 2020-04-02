import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ to, onClick, label, secondary, type, span, children }) => {
  const classes = `Btn ${secondary && `Btn--secondary`} ${type && `Btn--${type}`}`;

  // when you dont want an interactive element, like inside a label
  if (span)
    return <span className={classes}>{label || children}</span>;

  if (to)
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {label || children}
      </Link>
    );

  return <button onClick={onClick} className={classes}>{label || children}</button>;
};

export default Button
