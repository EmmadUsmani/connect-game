import { GameColor, GamePlayer, GameWinner } from "@connect-game/shared"
import styled from "styled-components"

import { List } from "components/layout"
import { Tooltip } from "components/wrapper"
import { useTheme } from "context"

interface PlayerOrderProps {
  currPlayerIdx: number
  numCols: number
  players: GamePlayer[]
  winner: GameWinner
}

interface StyledDivProps {
  color: GameColor
  currPlayer: boolean
  height: number
  width: number
}

const StyledDiv = styled.div<StyledDivProps>`
  background-color: ${(props) => props.color};
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  opacity: ${(props) => (props.currPlayer ? 100 : 25)}%;
`

export function PlayerOrder({
  currPlayerIdx,
  numCols,
  players,
  winner,
}: PlayerOrderProps) {
  const theme = useTheme()

  const totalWidth = theme.sizes.game.piece * (numCols * 2 - 1)
  const playerWidth = totalWidth / players.length
  const height = theme.sizes.game.piece / 2

  return (
    <List direction="row" spacing={0}>
      {players.map((player, index) => (
        <Tooltip key={index} delay={50} id={player.name} label={player.name}>
          <StyledDiv
            color={player.color}
            currPlayer={index === currPlayerIdx && winner === undefined}
            height={height}
            width={playerWidth}
          />
        </Tooltip>
      ))}
    </List>
  )
}
