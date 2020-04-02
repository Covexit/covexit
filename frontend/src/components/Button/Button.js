import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ to, label, children, secondary, type }) => (
  <Link to={to} className={`Btn ${secondary && `Btn--secondary`} ${type && `Btn--${type}`}`}>
    {label || children}
  </Link>
)

export default Button
