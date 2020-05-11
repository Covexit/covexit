import React from 'react'
import { Link } from 'react-router-dom'
import './Button.scss';

const Button = ({ to, onClick, label, secondary, type, span, children, disabled, external }) => {
  const classes = `Btn ${secondary && 'Btn--secondary'} ${type && 'Btn--' + type} ${disabled && 'Btn--disabled'}`;

  // when you dont want an interactive element, like inside a label
  if (span)
    return <span className={classes}>{label || children}</span>;

  if (to)
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {label || children}
      </Link>
    );

  if (external)
    return (
      <a href={external} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {label || children}
      </a>
    );

  return <button onClick={onClick} disabled={disabled} className={classes}>{label || children}</button>;
};

export default Button
