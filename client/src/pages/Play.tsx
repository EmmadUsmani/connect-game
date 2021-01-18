import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useGame } from "../context";
import { Button, Link, Page } from "../components";
import { Board, Header } from "../components/play";

const Play: React.FC = () => {
  const history = useHistory();
  const { board, players, currPlayerIdx, you, winner, placePiece } = useGame();

  useEffect(() => {
    return history.listen(() => {
      if (history.action === "POP") history.push("/");
    });
  }, [history]);

  const handleColumnClick = (colNum: number): void => {
    placePiece(colNum);
  };

  return (
    <Page>
      <Header currPlayer={players[currPlayerIdx]} you={you} winner={winner} />
      <Board
        board={board}
        handleColumnClick={handleColumnClick}
        clickable={
          winner === undefined && players[currPlayerIdx].name === you.name
        }
        pieceSize={60}
      />
      {winner !== undefined ? (
        <Link to="/room">
          <Button style={{ marginTop: 20 }}>Back to lobby</Button>
        </Link>
      ) : null}
    </Page>
  );
};

export default Play;
