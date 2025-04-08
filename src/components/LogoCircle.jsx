import React from 'react';
import './LogoCircle.css';

const LogoCircle = ({ isHovered }) => {
  return (
    <div className={`logo-text-only ${isHovered ? 'hovered' : ''}`}>
      <div className={`logo-text ${isHovered ? 'hovered' : ''}`}>
        <span className="logo-thin">Twin</span>
        <span className="logo-bold">NU</span>
      </div>
    </div>
  );
};

export default LogoCircle;
