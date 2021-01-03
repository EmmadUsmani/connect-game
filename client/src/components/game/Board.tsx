import React from "react";

import Piece from "./Piece";
import { GameBoard } from "../../models";
import "./Board.css";

interface BoardProps {
  board: GameBoard | undefined;
  handleColumnClick(colNum: number): void;
  clickable: boolean;
  pieceSize: number;
}

const Board: React.FC<BoardProps> = ({
  board,
  handleColumnClick,
  clickable,
  pieceSize,
}) => {
  return (
    <div className="board">
      {board?.map((col, idx) => (
        <div
          className="board-col"
          key={idx}
          onClick={() => handleColumnClick(idx)}
          style={{
            cursor: clickable ? "pointer" : "auto",
            margin: `0px ${pieceSize / 2}px`,
          }}
        >
          {col.map((player, idx) => (
            <Piece
              size={60}
              color={player ? player.color : undefined}
              key={idx}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
