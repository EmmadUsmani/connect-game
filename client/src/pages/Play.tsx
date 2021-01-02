import React, { useState } from "react";

import { Board } from "../components/game";
import { Game, GameBoard, GamePlayer } from "../models";
import "./Play.css";

const Play: React.FC = () => {
  const game = Game.instance;
  const [board, setBoard] = useState<GameBoard>(game.board);
  const [currPlayer, setCurrPlayer] = useState<GamePlayer>(game.currPlayer);

  const handleColumnClick = (colNum: number): void => {
    game.placePiece(colNum);
    setBoard(game.board);
    setCurrPlayer(game.currPlayer);
  };

  return (
    <>
      <p className="turn">
        <span style={{ color: currPlayer.color }}>{currPlayer.name}'s</span>{" "}
        turn
      </p>
      <Board board={board} handleColumnClick={handleColumnClick} />
    </>
  );
};

export default Play;
