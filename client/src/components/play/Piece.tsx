import React from "react";
import styled from "styled-components";

import { GameColor } from "@connect-game/shared";

interface PieceProps {
  size: number;
  color?: GameColor;
}

interface StyledDivProps {
  size: number;
  color?: GameColor;
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
`;

const Piece: React.FC<PieceProps> = ({ size, color }) => {
  return <StyledDiv size={size} color={color} />;
};

export default Piece;
