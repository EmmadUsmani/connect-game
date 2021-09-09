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

  if (winner === undefined) {
    // no player has won yet
    message = (
      <>
        <StyledSpan color={currPlayer.color}>
          {yourTurn ? "Your" : currPlayer.name}
        </StyledSpan>
        {yourTurn ? " turn" : "'s turn"}
      </>
    )
  } else if (winner === null) {
    // game is a draw
    message = <>Draw</>
  } else {
    message = (
      <>
        <StyledSpan color={winner.color}>
          {youWon ? "You" : winner.name}
        </StyledSpan>{" "}
        won!
      </>
    )
  }

  return <Text size={theme.sizes.text.large}>{message}</Text>
}
