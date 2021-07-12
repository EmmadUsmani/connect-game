import { useGame, useTheme } from "context";
import { Button } from "components";
import { Page } from "components/layouts";
import { Board, Header } from "../components";

export function Play() {
  const { gameState, placePiece, endGame } = useGame();
  const { board, currPlayerIdx, winner, you } = gameState.play;
  const { players } = gameState.room;

  const theme = useTheme();

  const handleColumnClick = (colNum: number) => {
    placePiece(colNum);
  };

  const handleBackClick = () => {
    if (you.isHost) endGame();
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
        pieceSize={theme.sizes.game.piece}
      />
      {winner !== undefined && you.isHost ? (
        <Button onClick={handleBackClick} style={{ marginTop: 20 }}>
          Back to lobby
        </Button>
      ) : null}
    </Page>
  ) : null;
}
