import { GameColor } from "@connect-game/shared"
import styled from "styled-components"

// TODO: understand why we need separate Piece and StyledDiv

interface PieceProps {
  size: number
  color?: GameColor
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

export function Piece({ size, color }: PieceProps) {
  return <StyledDiv color={color} size={size} />
}
