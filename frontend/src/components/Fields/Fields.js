import React, { useState } from 'react'
import edit from 'assets/edit.svg'

import './Fields.scss';
import Button from "../Button/Button";


const TextInput = ({ onKeyDown, placeholder, type, onChange, onFocus, onBlur, name,
                    value, optional }) => {
  return (
    <div className="TextInput" onKeyDown={onKeyDown}>
      <label>
        <span className="TextInput-label-text">{placeholder}</span>
        <input type={type || 'text'} className="TextInput-field" onChange={onChange}
               onFocus={onFocus} onBlur={onBlur} name={name} required={!optional}
               value={value} placeholder={placeholder}/>
      </label>
    </div>
  );
};

const PasswordInput = React.forwardRef(({ onKeyDown, onChange, onFocus, placeholder, onBlur,
                         name, value }, ref) => (
  <div className="TextInput TextInput--password" onKeyDown={onKeyDown}>
    <label>
      <span className="TextInput-label-text">{placeholder}</span>
      <input type="password" className="TextInput-field" onChange={onChange}
             onFocus={onFocus} onBlur={onBlur} name={name} autoComplete="new-password"
             value={value} placeholder={placeholder} required minLength="8" ref={ref}/>
    </label>
  </div>
));

const TextArea = ({ onKeyDown, placeholder, rows, onChange, onFocus, onBlur, name,
                    value, optional, maxLength }) => {
  return (
    <div className="TextArea" onKeyDown={onKeyDown}>
      <label>
        <span className="TextInput-label-text">{placeholder}</span>
        <textarea className="TextInput-field" onChange={onChange} required={!optional}
                  onFocus={onFocus} onBlur={onBlur} name={name} rows={rows || 3}
                  value={value} placeholder={placeholder} maxLength={maxLength}/>
      </label>
    </div>
  );
};

const FileUpload = ({ helpText, label, onChange, name, value, editView }) => {
  const [img, setImg] = useState();
  const file = typeof value === 'string' ? value : value && value[0];

  if (typeof value !== 'string') {
    if (file) {
      const reader = new FileReader();
      reader.onload = reader => setImg(reader.target.result);
      reader.readAsDataURL(file);
    }
  } else if (img !== value) {
    setImg(value);
  }

  return (
    <label className={`FileUpload ${editView ? 'FileUpload--editView' : ''}`}>
      {img && file &&
      <div className="FileUpload-preview TextInput-field">
        <img src={img} alt={file.name} className="FileUpload-img" />
        <span>{file.name}</span>
      </div>}
      {editView && <img className="FileUpload-pen" src={edit} alt=""/>}
      <Button secondary label={label} span className="test" />
      <span className="TextInput-helpText">{helpText}</span>
      <input type="file" className="FileUpload-field" onChange={onChange}
             name={name}/>
    </label>
  );
};

const CheckBox = ({ onChange, onFocus, onBlur, name, value, placeholder, checked, optional }) => (
  <div className="CheckBox" >
    <label>
      <input className="CheckBox-field" onChange={onChange} type="checkbox" required={!optional}
                onFocus={onFocus} onBlur={onBlur} name={name} checked={checked}
                value={value} placeholder={placeholder}/>
      <span className="CheckBox-check">
        <svg width="20px" height="20px" viewBox="0 0 20 20">
          <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z" />
          <polyline points="4 11 8 15 16 6" />
        </svg>
      </span>
      <span className="CheckBox-label">{placeholder}</span>
    </label>
  </div>
);

export default { TextInput, TextArea, FileUpload, PasswordInput, CheckBox }
