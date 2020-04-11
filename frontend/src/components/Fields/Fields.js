import React, { useState } from 'react'

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

export default { TextInput, TextArea, FileUpload, PasswordInput }
