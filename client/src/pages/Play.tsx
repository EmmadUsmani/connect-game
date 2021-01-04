import React, { useState } from "react";

import { Board, Header } from "../components/play";
import { Game, GameBoard, GamePlayer } from "../models";

const Play: React.FC = () => {
  const game = Game.instance;
  const [board, setBoard] = useState<GameBoard>(game.board);
  const [currPlayer, setCurrPlayer] = useState<GamePlayer>(game.currPlayer);
  const [winner, setWinner] = useState<GamePlayer | undefined>(game.winner);

  const handleColumnClick = (colNum: number): void => {
    if (winner) return;

    game.placePiece(colNum);
    setBoard(game.board);
    setCurrPlayer(game.currPlayer);
    setWinner(game.winner);
  };

  return (
    <>
      <Header currPlayer={currPlayer} winner={winner} />
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
