import React, { useState } from 'react'

import './Fields.scss';
import Button from "../Button/Button";


const TextInput = ({ onKeyDown, placeholder, type, onChange, onFocus, onBlur, name,
                    value }) => {
  return (
    <div className="TextInput" onKeyDown={onKeyDown}>
      <label>
        <span className="TextInput-label-text">{placeholder}</span>
        <input type={type || 'text'} className="TextInput-field" onChange={onChange}
               onFocus={onFocus} onBlur={onBlur} name={name}
               value={value} placeholder={placeholder}/>
      </label>
    </div>
  );
};

const NewPasswordInput = ({ onKeyDown, onChange, onFocus, onBlur, name, value }) => {
  const [ passwordRepeat, setPasswordRepeat ] = useState('');

  return (
    <>
      <div className="TextInput TextInput--password" onKeyDown={onKeyDown}>
        <label>
          <span className="TextInput-label-text">Password</span>
          <input type="password" className="TextInput-field" onChange={onChange}
                 onFocus={onFocus} onBlur={onBlur} name={name} autoComplete="new-password"
                 value={value} placeholder="Password" required minLength="8"/>
        </label>
      </div>
      <div className="TextInput TextInput--password" onKeyDown={onKeyDown}>
        <label>
          <span className="TextInput-label-text">Password (repeat)</span>
          <input type="password" className="TextInput-field" required minLength="8"
                 onFocus={onFocus} onBlur={onBlur} name={`${name}-repeat`}
                 autoComplete="new-password" placeholder="Password (repeat)"
                 onChange={e => setPasswordRepeat(e.target.value)}/>
        </label>
      </div>
    </>
  );
};

const TextArea = ({ onKeyDown, placeholder, rows, onChange, onFocus, onBlur, name,
                    value }) => {
  return (
    <div className="TextArea" onKeyDown={onKeyDown}>
      <label>
        <span className="TextInput-label-text">{placeholder}</span>
        <textarea className="TextInput-field" onChange={onChange}
                  onFocus={onFocus} onBlur={onBlur} name={name} rows={rows || 3}
                  value={value} placeholder={placeholder}/>
      </label>
    </div>
  );
};

const FileUpload = ({ helpText, label, onChange, name, value }) => {
  const [img, setImg] = useState();
  const file = value && value[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = reader => setImg(reader.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="FileUpload">
      {img && file &&
      <div className="FileUpload-preview TextInput-field">
        <img src={img} alt={file.name} className="FileUpload-img" />
        <span>{file.name}</span>
      </div>}
      <label>
        <Button secondary label={label} span className="test" />
        <span className="TextInput-helpText">{helpText}</span>
        <input type="file" className="FileUpload-field" onChange={onChange}
               name={name}/>
      </label>
    </div>
  );
};

export default { TextInput, TextArea, FileUpload, NewPasswordInput }
