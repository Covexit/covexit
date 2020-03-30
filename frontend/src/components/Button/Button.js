import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ to, label, secondary, type }) => (
  <Link to={to} className={`Btn ${secondary && `Btn--secondary`} ${type && `Btn--${type}`}`}>
    {label}
  </Link>
)

export default Button
