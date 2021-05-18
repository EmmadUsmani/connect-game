import React from "react";

import { useGame } from "../context/game";
import { usePreventBackNav } from "../hooks";
import { Button, Page } from "../components";
import { Board, Header } from "../components/play";

const Play: React.FC = () => {
  // const {
  //   board,
  //   players,
  //   currPlayerIdx,
  //   you,
  //   winner,
  //   placePiece,
  //   leaveRoom,
  //   endGame,
  // } = useGame();
  // usePreventBackNav(leaveRoom);

  // const handleColumnClick = (colNum: number): void => {
  //   placePiece(colNum);
  // };

  // const handleBackClick = (): void => {
  //   if (you.isHost) endGame();
  // };

  return null;
  // return players.length !== 0 ? (
  //   <Page>
  //     <Header currPlayer={players[currPlayerIdx]} you={you} winner={winner} />
  //     <Board
  //       board={board}
  //       handleColumnClick={handleColumnClick}
  //       clickable={
  //         winner === undefined && players[currPlayerIdx].name === you.name
  //       }
  //       pieceSize={60}
  //     />
  //     {winner !== undefined && you.isHost ? (
  //       <Button onClick={handleBackClick} style={{ marginTop: 20 }}>
  //         Back to lobby
  //       </Button>
  //     ) : null}
  //   </Page>
  // ) : null;
};

export default Play;
