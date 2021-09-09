import { GameColor, GamePlayer } from "@connect-game/shared"
import styled from "styled-components"

import { Tooltip } from "components/wrapper"
import { useTheme } from "context"

interface PieceProps {
  id: string
  player?: GamePlayer
}

interface StyledDivProps {
  size: number
  color?: GameColor
}

const StyledDiv = styled.div<StyledDivProps>`
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  box-sizing: border-box;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-color: ${(props) =>
    props.color ? "transparent" : props.theme.colors.game.piece};
`

export function Piece({ id, player }: PieceProps) {
  const theme = useTheme()

  return (
    <Tooltip
      delay={100}
      id={id}
      label={player ? player.name : ""}
      offset={{ top: -5 }}
    >
      <StyledDiv color={player?.color} size={theme.sizes.game.piece} />
    </Tooltip>
  )
}
