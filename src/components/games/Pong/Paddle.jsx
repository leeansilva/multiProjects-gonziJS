import React from 'react';

const Paddle = ({ position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: position,
        left: 0,
        width: '20px',
        height: '100px',
        backgroundColor: 'white',
      }}
    />
  );
};

export default Paddle;
