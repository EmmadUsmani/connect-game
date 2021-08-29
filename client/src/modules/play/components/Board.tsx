import { GameBoard } from "@connect-game/shared"
import styled from "styled-components"

import { Clickable } from "components/wrapper"

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
        <Clickable disabled={!clickable} onClick={() => handleClick(colIndex)}>
          <StyledColDiv
            key={colIndex}
            clickable={clickable}
            pieceSize={pieceSize}
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
        </Clickable>
      ))}
    </StyledBoardDiv>
  )
}
