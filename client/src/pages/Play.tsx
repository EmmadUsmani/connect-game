import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useGame } from "../context";
import { Button, Link, Page } from "../components";
import { Board, Header } from "../components/play";

const Play: React.FC = () => {
  const history = useHistory();
  const { board, players, currPlayerIdx, winner, placePiece } = useGame();

  // TODO: refactor to custom hook to use in multiple places (like room)
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
      <Header currPlayer={players[currPlayerIdx]} winner={winner} />
      <Board
        board={board}
        handleColumnClick={handleColumnClick}
        clickable={!winner}
        pieceSize={60}
      />
      {winner || winner === null ? (
        <Link to="/room">
          <Button style={{ marginTop: 20 }}>Back to lobby</Button>
        </Link>
      ) : null}
    </Page>
  );
};

export default Play;
