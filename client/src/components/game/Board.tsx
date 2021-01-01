import React from "react";

import Circle from "./Circle";
import "./Board.css";

interface BoardProps {
  numRows: number;
  numCols: number;
}

const Board: React.FC<BoardProps> = ({ numRows, numCols }) => {
  const cols: JSX.Element[][] = [];
  for (let i = 0; i < numCols; i++) {
    const col: JSX.Element[] = [];
    for (let j = 0; j < numRows; j++) {
      col.push(<Circle size={60} key={i.toString() + j.toString()} />);
    }
    cols.push(col);
  }

  return (
    <div className="board">
      {cols.map((col, index) => (
        <div className="board-col" key={index}>
          {col}
        </div>
      ))}
    </div>
  );
};

export default Board;
