import React, { useState } from 'react';
import './App.css';
import LogoCircle from './components/LogoCircle';
import OrbitLayer from './components/OrbitLayer';

const avatars = [
  '/images/conor.png',
  '/images/ella.png',
  '/images/kevin.png',
  '/images/matej.png',
  '/images/steve.png',
];

function App() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="App">

      <div
        className="interactive-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <OrbitLayer radius={150} avatars={avatars} opacity={1} />
        <LogoCircle isHovered={hovered} />
      </div>

      <OrbitLayer radius={300} avatars={[...avatars, ...avatars]} opacity={0.45} />
      <OrbitLayer radius={450} avatars={[...avatars, ...avatars, ...avatars]} opacity={0.3} />
      <OrbitLayer radius={600} avatars={[...avatars, ...avatars, ...avatars, ...avatars]} opacity={0.15} />
      <OrbitLayer radius={750} avatars={[...avatars, ...avatars, ...avatars, ...avatars, ...avatars]} opacity={0.1} />
      <OrbitLayer radius={900} avatars={[...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars]} opacity={0.05} />
      <OrbitLayer radius={1050} avatars={[...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars]} opacity={0.035} />
      <OrbitLayer radius={1200} avatars={[...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars]} opacity={0.02} />
      <OrbitLayer radius={1350} avatars={[...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars]} opacity={0.005} />
      <OrbitLayer radius={1500} avatars={[...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars]} opacity={0.0025} />
      <OrbitLayer radius={1650} avatars={[...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars, ...avatars]} opacity={0.001} />

      <div className="black-overlay" />
      <div className="top-gradient">
        <h1 className="coming-soon-text">Coming Soon...</h1>
      </div>
    </div>
  );
}

export default App;
