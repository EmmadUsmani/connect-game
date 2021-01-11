import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Link, Page } from "../components";
import { Board, Header } from "../components/play";
import { Game, GameBoard, GamePlayer } from "../models";

const Play: React.FC = () => {
  const game = Game.instance;
  const [board, setBoard] = useState<GameBoard>(game.board);
  const [currPlayer, setCurrPlayer] = useState<GamePlayer>(game.currPlayer);
  const [winner, setWinner] = useState<GamePlayer | undefined>(game.winner);

  const history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      if (history.action === "POP") history.push("/");
    });
  }, [history]);

  const handleColumnClick = (colNum: number): void => {
    if (winner) return;

    game.placePiece(colNum);
    setBoard(game.board);
    setCurrPlayer(game.currPlayer);
    setWinner(game.winner);
  };

  return (
    <Page>
      <Header currPlayer={currPlayer} winner={winner} />
      <Board
        board={board}
        handleColumnClick={handleColumnClick}
        clickable={!winner}
        pieceSize={60}
      />
      {winner ? (
        <Link to="/room">
          <Button style={{ marginTop: 20 }}>Back to lobby</Button>
        </Link>
      ) : null}
    </Page>
  );
};

export default Play;
