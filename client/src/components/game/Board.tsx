import React, { useState } from "react";

import Circle from "./Circle";
import { Game, Player } from "../../models";
import "./Board.css";

interface BoardProps {
  game: Game;
}

const Board: React.FC<BoardProps> = ({ game }) => {
  const [board, setBoard] = useState<(Player | null)[][]>(game.board);

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
