import React from 'react'

import './TextInput.scss';


const TextInput = (props) => {
  return (
    <div className="TextInput" onKeyDown={props.onKeyDown}>
      <label>
        <span className="TextInput-label-text">{props.placeholder}</span>
        <input type={props.type || 'text'} className="TextInput-field" onChange={props.onChange}
               onFocus={props.onFocus} onBlur={props.onBlur}
               value={props.value} placeholder={props.placeholder} />
       </label>
    </div>
  );
};

export default TextInput
