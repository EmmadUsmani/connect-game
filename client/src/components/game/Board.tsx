import React, { useState } from "react";

import Circle from "./Circle";
import { Game, GameBoard } from "../../models";
import "./Board.css";

const Board: React.FC = () => {
  const game = Game.instance;
  const [board, setBoard] = useState<GameBoard>(game.board);

  return (
    <div className="board">
      {board.map((col, idx) => (
        <div
          className="board-col"
          key={idx}
          onClick={() => {
            game.placePiece(idx);
            setBoard(game.board);
          }}
        >
          {col.map((player, idx) => (
            <Circle
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
