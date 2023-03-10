import React, { useState, useEffect, useRef } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';

const PongGame = () => {
  const [player1Position, setPlayer1Position] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: 300, y: 200 });
  const [ballDirection, setBallDirection] = useState({ x: 1, y: 1 });
  const gameBoardRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && player1Position > 0) {
        setPlayer1Position(player1Position - 5);
      }
      if (e.key === 'ArrowDown' && player1Position < 400) {
        setPlayer1Position(player1Position + 5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [player1Position]);

  useEffect(() => {
    const updateBallPosition = () => {
        const newBallPosition = {
          x: ballPosition.x + ballDirection.x * 5,
          y: ballPosition.y + ballDirection.y * 5,
        };
  
        // detect collision with top or bottom of game board
        if (newBallPosition.y < 0 || newBallPosition.y > gameBoard.clientHeight - 20) {
          setBallDirection({ ...ballDirection, y: -ballDirection.y });
        }
  
        // detect collision with right side of game board
        if (newBallPosition.x > gameBoard.clientWidth - 20) {
          setBallPosition({ x: 300, y: 200 });
          setBallDirection({ x: 1, y: 1 });
        }
  
        setBallPosition(newBallPosition);
      };

    const gameBoard = gameBoardRef.current;
    const timerId = setInterval(() => {
      // detect collision with top or bottom of game board
      if (ballPosition.y < 0 || ballPosition.y > gameBoard.clientHeight - 20) {
        setBallDirection({ ...ballDirection, y: -ballDirection.y });
      }

      // detect collision with right side of game board
      if (ballPosition.x > gameBoard.clientWidth - 20) {
        setBallPosition({ x: 300, y: 200 });
        setBallDirection({ x: 1, y: 1 });
      }

      updateBallPosition();
    }, 50);

    return () => {
      clearInterval(timerId);
    };
  }, [ballPosition, ballDirection]);

  return (
    <div
      ref={gameBoardRef}
      style={{
        position: 'relative',
        width: '600px',
        height: '400px',
        backgroundColor: 'black',
      }}
    >
      <Paddle position={player1Position} />
      <Ball position={ballPosition} />
    </div>
  );
};

export default PongGame;
