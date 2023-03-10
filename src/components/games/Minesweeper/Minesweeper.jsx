import React, { useState } from "react";
import './style.css'

const generateBoard = (rows, cols, bombs) => {
  // Crear un tablero vacío
  let board = Array(rows)
    .fill()
    .map(() => Array(cols).fill(false));

  // Colocar las bombas aleatoriamente
  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    let randomRow = Math.floor(Math.random() * rows);
    let randomCol = Math.floor(Math.random() * cols);
    if (!board[randomRow][randomCol]) {
      board[randomRow][randomCol] = true;
      bombsPlaced++;
    }
  }

  return board;
};

const Cell = ({ revealed, value, onClick }) => {
  let backgroundColor = "gray";
  let displayValue = "";

  if (revealed) {
    backgroundColor = "white";
    displayValue = value ? "💣" : "s";
  }

  return (
    <div
      className="cell"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {displayValue}
    </div>
  );
};

const Board = ({ board, onReveal }) => {
  const reveal = (row, col) => {
    if (!board[row][col]) {
      onReveal(row, col);
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            revealed={cell.revealed}
            value={cell.value}
            onClick={() => reveal(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

const Minesweeper = ({ rows, cols, bombs }) => {
  const [board, setBoard] = useState(
    generateBoard(rows, cols, bombs).map(row =>
      row.map(cell => ({ revealed: false, value: cell }))
    )
  );

  const reveal = (row, col) => {
    if (board[row][col].revealed) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col].revealed = true;
    setBoard(newBoard);

    if (!board[row][col].value) {
      // Si la celda no contiene una bomba, revelar las celdas vecinas
      const neighbors = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      for (let [dRow, dCol] of neighbors) {
        let newRow = row + dRow;
        let newCol = col + dCol;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols
        ) {
          reveal(newRow, newCol);
        }
      }
    }
  };

  return (
    <div>
      <Board board={board} onReveal={reveal} />
    </div>
  );
};

export default Minesweeper;
