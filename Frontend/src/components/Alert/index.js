import React, { useState, useEffect } from 'react';
import './styles.scss'; // Import CSS file for styling the alert

const Alert = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 1500); 

    return () => clearTimeout(timeout);
  }, []); 

  return (
    <div className={`alert ${visible ? 'show' : 'hide'}`}>
      {message}
    </div>
  );
};

export default Alert;
