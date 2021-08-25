import { GamePlayer, GameWinner } from "@connect-game/shared"
import React from "react"
import styled from "styled-components"

import { Text } from "components"
import { useTheme } from "context"

interface HeaderProps {
  currPlayer: GamePlayer
  you: GamePlayer
  winner?: GameWinner
}

const StyledSpan = styled.span`
  color: ${(props) => props.color};
`

export function Header({ currPlayer, you, winner }: HeaderProps) {
  const theme = useTheme()

  const yourTurn = currPlayer.name === you.name
  const youWon = winner && winner.name === you.name
  let message: React.ReactNode

  // TODO: refactor to if statement
  switch (winner) {
    // no player has won yet
    case undefined:
      message = (
        <>
          <StyledSpan color={currPlayer.color}>
            {yourTurn ? "Your" : currPlayer.name}
          </StyledSpan>
          {yourTurn ? " turn" : "'s turn"}
        </>
      )
      break
    // game is a tie
    case null:
      message = <>Draw</>
      break
    // there is a winner
    default:
      message = (
        <>
          <StyledSpan color={winner.color}>
            {youWon ? "You" : winner.name}
          </StyledSpan>{" "}
          won!
        </>
      )
      break
  }

  return <Text size={theme.sizes.text.large}>{message}</Text>
}
