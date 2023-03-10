import React, { useState, useEffect } from "react";
import "./style.css";

const Pacman = () => {
  const [pacmanPosition, setPacmanPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("right");

  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") {
      setDirection("right");
    } else if (e.key === "ArrowLeft") {
      setDirection("left");
    } else if (e.key === "ArrowUp") {
      setDirection("up");
    } else if (e.key === "ArrowDown") {
      setDirection("down");
    }
  };

  useEffect(() => {
    const container = document.querySelector(".container");
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const intervalId = setInterval(() => {
      switch (direction) {
        case "right":
          if (pacmanPosition.x < containerWidth - 60) {
            setPacmanPosition((pos) => ({ x: pos.x + 10, y: pos.y }));
          }
          break;
        case "left":
          if (pacmanPosition.x > 0) {
            setPacmanPosition((pos) => ({ x: pos.x - 10, y: pos.y }));
          }
          break;
        case "up":
          if (pacmanPosition.y > 0) {
            setPacmanPosition((pos) => ({ x: pos.x, y: pos.y - 10 }));
          }
          break;
        case "down":
          if (pacmanPosition.y < containerHeight - 60) {
            setPacmanPosition((pos) => ({ x: pos.x, y: pos.y + 10 }));
          }
          break;
        default:
          break;
      }
    }, 100);

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction, pacmanPosition]);

  return (
    <div className="containerPacman">
      <div className="map">
        <div className="wall"></div>
        <div className="wall"></div>
        <div className="wall"></div>
        <div className="wall"></div>
        <div className="wall"></div>
        <div className="wall"></div>
        <div className="wall"></div>
        <div className="wall"></div>
        <div className="wall"></div>
        <div className="wall"></div>
        <img
          className="pacman"
          style={{
            position: "absolute",
            top: `${pacmanPosition.y}px`,
            left: `${pacmanPosition.x}px`,
          }}
          src="https://i.pinimg.com/originals/09/13/22/091322a242b03a5ac457cb0ecd3c7396.png"
          alt="pacman"
          width="50px"
          height="50px"
        />
      </div>
    </div>
  );
};

export default Pacman;
