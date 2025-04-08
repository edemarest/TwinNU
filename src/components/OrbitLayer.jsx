import React, { useEffect, useState } from 'react';
import './OrbitLayer.css';

const OrbitLayer = ({ radius, avatars, speed = 30, opacity = 1 }) => {
  const [rotation, setRotation] = useState(0);
  const avatarSize = 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.1);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const angleStep = 360 / avatars.length;

  return (
    <div
      className="orbit-layer"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        opacity: opacity,
        borderWidth: '5px',
      }}
    >
      {avatars.map((src, i) => {
        const angle = angleStep * i + rotation;
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.cos(rad) - avatarSize / 2;
        const y = radius * Math.sin(rad) - avatarSize / 2;

        return (
          <div
            key={i}
            className="avatar-wrapper"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <img src={src} alt="avatar" className="orbit-avatar" />
          </div>
        );
      })}
    </div>
  );
};

export default OrbitLayer;
