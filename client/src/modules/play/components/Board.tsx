import { GameBoard } from "@connect-game/shared"
import styled from "styled-components"

import { Piece } from "."

interface BoardProps {
  board: GameBoard
  handleColumnClick(colNum: number): void
  clickable: boolean
  pieceSize: number
}

interface StyledColProps {
  clickable: boolean
  pieceSize: number
}

const StyledBoardDiv = styled.div`
  display: inline-flex;
  flex-direction: row;
`

const StyledColDiv = styled.div<StyledColProps>`
  display: flex;
  flex-direction: column-reverse;
  cursor: ${(props) => (props.clickable ? "pointer" : "auto")};
  margin: 0px ${(props) => props.pieceSize / 2}px;
`

export function Board({
  board,
  handleColumnClick,
  clickable,
  pieceSize,
}: BoardProps) {
  const handleClick = (colNum: number) => {
    if (!clickable) {
      return
    }
    handleColumnClick(colNum)
  }

  return (
    <StyledBoardDiv>
      {board.map((col, colIndex) => (
        <StyledColDiv
          key={colIndex}
          clickable={clickable}
          pieceSize={pieceSize}
          onClick={() => handleClick(colIndex)}
        >
          {col.map((piece, rowIndex) => (
            <Piece
              key={rowIndex}
              id={`${rowIndex}-${colIndex}`}
              player={piece}
              size={pieceSize}
            />
          ))}
        </StyledColDiv>
      ))}
    </StyledBoardDiv>
  )
}
