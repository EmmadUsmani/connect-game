import React from "react";

import Circle from "./Circle";
import { Game } from "../../models";
import "./Board.css";

interface BoardProps {
  game: Game;
}

const Board: React.FC<BoardProps> = ({ game }) => {
  return (
    <div className="board">
      {game.board.map((col, index) => (
        <div className="board-col" key={index}>
          {col.map((player, index) => (
            <Circle size={60} color={player ? player.color : undefined} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
