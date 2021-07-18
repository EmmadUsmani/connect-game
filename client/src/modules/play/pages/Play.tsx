import { Button } from "components"
import { Page, Spacer } from "components/layout"
import { useGame, useTheme } from "context"

import { Board, Header } from "../components"

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
        <>
          <Spacer size={10} />
          <Button onClick={handleBackClick}>Back to lobby</Button>
        </>
      ) : null}
    </Page>
  ) : null
}
