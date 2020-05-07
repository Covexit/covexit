import React, { useState } from 'react';
import './Dropdown.scss';
import Button from '../Button/Button';


function Dropdown({ label, children, ...rest }) {
  const [show, setShow] = useState(false);
  console.log(rest);
  return (
    <div className="Dropdown">
      <Button className="Dropdown-button" onClick={() => setShow(!show)} {...rest}>{label}</Button>
      {show &&
        <div className="Dropdown-body">
          {React.Children.map(children, (child, index) => (
            <div className="Dropdown-body-item">{child}</div>
          ))}
        </div>
      }
    </div>
  )
}

export default Dropdown;
