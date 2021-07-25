import { GameColor, GamePlayer } from "@connect-game/shared"
import styled from "styled-components"

import { Tooltip } from "components"

interface PieceProps {
  id: string
  size: number
  player?: GamePlayer
}

interface StyledDivProps {
  size: number
  color?: GameColor
}

const StyledDiv = styled.div<StyledDivProps>`
  border-radius: 50%;
  border-width: 1;
  border-style: solid;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: ${(props) => props.size / 2}px 0px;
  background-color: ${(props) => props.color};
  border-color: ${(props) =>
    props.color ? "transparent" : props.theme.colors.game.piece};
`

export function Piece({ id, size, player }: PieceProps) {
  return (
    <Tooltip
      delay={100}
      id={id}
      label={player ? player.name : ""}
      offset={`{'top': -${size / 2 + 10}}`}
    >
      <StyledDiv color={player?.color} size={size} />
    </Tooltip>
  )
}
