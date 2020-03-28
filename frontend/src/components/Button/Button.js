import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ to, label, secondary }) => (
  <Link to={to} className={`Btn ${secondary && `Btn--secondary`}`}>
    {label}
  </Link>
)

export default Button