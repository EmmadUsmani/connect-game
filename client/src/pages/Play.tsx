import React from "react";

import { useGame } from "../context";
import { usePreventBackNav } from "../hooks";
import { Button, Link, Page } from "../components";
import { Board, Header } from "../components/play";

const Play: React.FC = () => {
  const {
    board,
    players,
    currPlayerIdx,
    you,
    winner,
    placePiece,
    leaveRoom,
  } = useGame();
  usePreventBackNav(leaveRoom);

  const handleColumnClick = (colNum: number): void => {
    placePiece(colNum);
  };

  return players.length !== 0 ? (
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
  ) : null;
};

export default Play;
