import React from 'react';

const Ball = ({ position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'white',
      }}
    />
  );
};

export default Ball;
