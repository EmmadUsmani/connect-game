import { List, Page, Spacer } from "components/layout"
import { useGame, useTheme } from "context"

import { Board, Header, BackIcon, ReplayIcon, PlayerOrder } from "../components"

export function Play() {
  const { gameState, placePiece, endGame, startGame } = useGame()
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

  const handleReplayClick = () => {
    if (you.isHost) {
      startGame()
    }
  }

  const showHostButtons = winner !== undefined && you.isHost

  return players.length !== 0 ? (
    <Page>
      <List direction="row" spacing={40}>
        {showHostButtons && <BackIcon onClick={handleBackClick} />}
        <Header currPlayer={players[currPlayerIdx]} winner={winner} you={you} />
        {showHostButtons && <ReplayIcon onClick={handleReplayClick} />}
      </List>
      <Spacer size={theme.sizes.game.piece * 2} />
      <Board
        board={board}
        disabled={
          winner !== undefined || players[currPlayerIdx].name !== you.name
        }
        handleColumnClick={handleColumnClick}
        pieceSize={theme.sizes.game.piece}
      />
      <Spacer size={theme.sizes.game.piece * 1.5} />
      <PlayerOrder
        board={board}
        currPlayerIdx={currPlayerIdx}
        players={players}
        winner={winner}
      />
    </Page>
  ) : null
}

/* 
TODO: better error handling for players.length !== 0 
This should be a generic error screen ("uh oh something went wrong")
and should trigger some logging

TODO: move showHostButtons to game context?

TODO: move click functions inline?
don't need to check host due to conditional rendering
*/
