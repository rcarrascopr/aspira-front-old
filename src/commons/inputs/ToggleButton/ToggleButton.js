import React, { useState, useEffect } from 'react';
import './ToggleButton.css'; // Import the CSS file

const ToggleButton = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.selectedOption === 'dashboard' ? 'reportes' : 'dashboard'); // Initial selection

  const handleToggle = () => {
    setSelectedOption(selectedOption === 'dashboard' ? 'reportes' : 'dashboard');
    props.onToggle()
  };

  useEffect(() => {
    setSelectedOption(props.selectedOption)
  }, [])

  return (
    <div className={`toggle-container ${selectedOption}`} onClick={handleToggle}>
      <div className="toggle-switch">
        <div className="toggle-slider"></div>
      </div>
      <span className="toggle-label toggle-label-left">GPH</span>
      <span className="toggle-label toggle-label-right">Admin</span>
    </div>
  );
};

export default ToggleButton;
