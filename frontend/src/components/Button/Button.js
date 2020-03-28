import React from 'react';
import './Button.scss';
import { Link } from "react-router-dom";

function Button(props) {
  return (
    <Link to={props.to} className={'button' + (props.type ? ' button--' + props.type : '')}>{props.label}</Link>
  );
}

export default Button;
