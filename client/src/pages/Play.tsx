import React, { useState } from "react";

import { Board } from "../components/game";
import { Game, GameBoard, GamePlayer } from "../models";
import "./Play.css";

const Play: React.FC = () => {
  const game = Game.instance;
  const [board, setBoard] = useState<GameBoard>(game.board);
  const [currPlayer, setCurrPlayer] = useState<GamePlayer>(game.currPlayer);
  const [winner, setWinner] = useState<GamePlayer | null>(game.winner);

  const handleColumnClick = (colNum: number): void => {
    if (winner) return;

    game.placePiece(colNum);
    setBoard(game.board);
    setCurrPlayer(game.currPlayer);
    setWinner(game.winner);
  };

  return (
    <>
      <p className="turn">
        {winner ? (
          <>
            <span style={{ color: winner.color }}>{winner.name}</span> won!
          </>
        ) : (
          <>
            <span style={{ color: currPlayer.color }}>{currPlayer.name}'s</span>{" "}
            turn
          </>
        )}
      </p>
      <Board
        board={board}
        handleColumnClick={handleColumnClick}
        clickable={!winner}
        pieceSize={60}
      />
    </>
  );
};

export default Play;
