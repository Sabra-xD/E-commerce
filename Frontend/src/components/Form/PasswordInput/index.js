// PasswordInput.js
import React, { useState } from 'react';
import './styles.scss';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PasswordInput = ({ placeholder,handleChange,label, ...otherProps }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setInputType(passwordVisible ? 'password' : 'text');
  };

  return (
    <div className="password-input-container">
        {label && (
        <label>
          {label}
        </label>
      )}

      <input
        type={inputType}
        placeholder={placeholder}
        onChange={handleChange} 
        className="password-input"
        {...otherProps}
      />
      <div className="eye-icon" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={passwordVisible ?  faEye : faEyeSlash}/>
      </div>
    </div>
  );
};

export default PasswordInput;
