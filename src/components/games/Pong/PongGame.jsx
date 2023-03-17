import React, { useState, useEffect } from 'react';

const FIELD_HEIGHT = 400;
const FIELD_WIDTH = 600;
const BALL_SIZE = 20;
const BALL_SPEED = 5;
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const PADDLE_SPEED = 5;

const PongGame = () => {
  const [ballPosition, setBallPosition] = useState({
    x: FIELD_WIDTH / 2 - BALL_SIZE / 2,
    y: FIELD_HEIGHT / 2 - BALL_SIZE / 2,
  });
  const [ballVelocity, setBallVelocity] = useState({
    x: BALL_SPEED,
    y: BALL_SPEED,
  });
  const [playerPaddlePosition, setPlayerPaddlePosition] = useState({
    x: 10,
    y: FIELD_HEIGHT / 2 - PADDLE_HEIGHT / 2,
  });
  const [computerPaddlePosition, setComputerPaddlePosition] = useState({
    x: FIELD_WIDTH - PADDLE_WIDTH - 10,
    y: FIELD_HEIGHT / 2 - PADDLE_HEIGHT / 2,
  });

  const moveComputerPaddle = () => {
    if (
      computerPaddlePosition.y + PADDLE_HEIGHT / 2 <
      ballPosition.y + BALL_SIZE / 2
    ) {
      setComputerPaddlePosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y + PADDLE_SPEED,
      }));
    } else if (
      computerPaddlePosition.y + PADDLE_HEIGHT / 2 >
      ballPosition.y + BALL_SIZE / 2
    ) {
      setComputerPaddlePosition((prevPosition) => ({
        ...prevPosition,
        y: prevPosition.y - PADDLE_SPEED,
      }));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBallPosition((prevPosition) => {
        const nextX = prevPosition.x + ballVelocity.x;
        const nextY = prevPosition.y + ballVelocity.y;

        if (nextY <= 0 || nextY + BALL_SIZE >= FIELD_HEIGHT) {
          setBallVelocity((prevVelocity) => ({
            ...prevVelocity,
            y: -prevVelocity.y,
          }));
        }

        if (
          nextX <= playerPaddlePosition.x + PADDLE_WIDTH &&
          nextY + BALL_SIZE >= playerPaddlePosition.y &&
          nextY <= playerPaddlePosition.y + PADDLE_HEIGHT
        ) {
          setBallVelocity((prevVelocity) => ({
            ...prevVelocity,
            x: -prevVelocity.x,
          }));
        } else if (
          nextX + BALL_SIZE >= computerPaddlePosition.x &&
          nextY + BALL_SIZE >= computerPaddlePosition.y &&
          nextY <= computerPaddlePosition.y + PADDLE_HEIGHT
        ) {
          setBallVelocity((prevVelocity) => ({
            ...prevVelocity,
            x: -prevVelocity.x,
          }));
        } else if (nextX <= 0 || nextX + BALL_SIZE >= FIELD_WIDTH) {
          setBallPosition({
            x: FIELD_WIDTH / 2 - BALL_SIZE / 2,
            y: FIELD_HEIGHT / 2 - BALL_SIZE / 2,
          });
          setBallVelocity({
            x: BALL_SPEED,
            y: BALL_SPEED,
          });
        } else {
          setBallPosition({
            x: nextX,
            y: nextY,
          });
        }

        return { x: nextX, y: nextY };
      });
    
      moveComputerPaddle();
    }, 20);
    
    return () => {
      clearInterval(intervalId);
    };
    }, [ballVelocity, playerPaddlePosition, computerPaddlePosition]);
    
    const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
    setPlayerPaddlePosition((prevPosition) => ({
    ...prevPosition,
    y: Math.max(0, prevPosition.y - PADDLE_SPEED),
    }));
    } else if (event.key === 'ArrowDown') {
    setPlayerPaddlePosition((prevPosition) => ({
    ...prevPosition,
    y: Math.min(
    FIELD_HEIGHT - PADDLE_HEIGHT,
    prevPosition.y + PADDLE_SPEED
    ),
    }));
    }
    };
    
    return (
    <div
    style={{
    width: FIELD_WIDTH,
    height: FIELD_HEIGHT,
    backgroundColor: '#333',
    position: 'relative',
    }}
    tabIndex="0"
    onKeyDown={handleKeyDown}
    >
    <div
    style={{
    width: BALL_SIZE,
    height: BALL_SIZE,
    backgroundColor: '#fff',
    borderRadius: '50%',
    position: 'absolute',
    top: ballPosition.y,
    left: ballPosition.x,
    }}
    />
    <div
    style={{
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    backgroundColor: '#fff',
    position: 'absolute',
    top: playerPaddlePosition.y,
    left: playerPaddlePosition.x,
    }}
    />
    <div
    style={{
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    backgroundColor: '#fff',
    position: 'absolute',
    top: computerPaddlePosition.y,
    left: computerPaddlePosition.x,
    }}
    />
    </div>
    );
    };
    
    export default PongGame;