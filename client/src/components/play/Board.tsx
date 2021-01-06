import React from "react";
import styled from "styled-components";

import Piece from "./Piece";
import { GameBoard } from "../../models";

interface BoardProps {
  board: GameBoard;
  handleColumnClick(colNum: number): void;
  clickable: boolean;
  pieceSize: number;
}

interface StyledColProps {
  clickable: boolean;
  pieceSize: number;
}

const StyledBoardDiv = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

const StyledColDiv = styled.div<StyledColProps>`
  display: flex;
  flex-direction: column-reverse;
  cursor: ${(props) => (props.clickable ? "pointer" : "auto")};
  margin: 0px ${(props) => props.pieceSize / 2}px;
`;

const Board: React.FC<BoardProps> = ({
  board,
  handleColumnClick,
  clickable,
  pieceSize,
}) => {
  return (
    <StyledBoardDiv>
      {board.map((col, idx) => (
        <StyledColDiv
          clickable={clickable}
          pieceSize={pieceSize}
          onClick={() => handleColumnClick(idx)}
          key={idx}
        >
          {col.map((player, idx) => (
            <Piece
              size={pieceSize}
              color={player ? player.color : undefined}
              key={idx}
            />
          ))}
        </StyledColDiv>
      ))}
    </StyledBoardDiv>
  );
};

export default Board;