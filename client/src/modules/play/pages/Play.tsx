import { Board, Header } from "../components"

import { Button } from "components"
import { Page } from "components/layouts"
import { useGame, useTheme } from "context"

export function Play() {
  const { gameState, placePiece, endGame } = useGame()
  const { board, currPlayerIdx, winner, you } = gameState.play
  const { players } = gameState.room

  const theme = useTheme()

  const handleColumnClick = (colNum: number) => {
    placePiece(colNum)
  }

  const handleBackClick = () => {
    if (you.isHost) {
      endGame()
    }
  }

  return players.length !== 0 ? (
    <Page>
      <Header currPlayer={players[currPlayerIdx]} winner={winner} you={you} />
      <Board
        board={board}
        clickable={
          winner === undefined && players[currPlayerIdx].name === you.name
        }
        handleColumnClick={handleColumnClick}
        pieceSize={theme.sizes.game.piece}
      />
      {winner !== undefined && you.isHost ? (
        <Button style={{ marginTop: 20 }} onClick={handleBackClick}>
          Back to lobby
        </Button>
      ) : null}
    </Page>
  ) : null
}
