import { GameBoard } from "@connect-game/shared"

import { List } from "components/layout"
import { Clickable } from "components/wrapper"

import { Piece } from "."

interface BoardProps {
  board: GameBoard
  disabled: boolean
  handleColumnClick(colNum: number): void
  pieceSize: number
}

export function Board({
  board,
  disabled,
  handleColumnClick,
  pieceSize,
}: BoardProps) {
  return (
    <List direction="row" spacing={pieceSize}>
      {board.map((column, columnIndex) => (
        <Clickable
          disabled={disabled}
          onClick={() => handleColumnClick(columnIndex)}
        >
          <List
            key={columnIndex}
            direction="column-reverse"
            spacing={pieceSize}
          >
            {column.map((piece, rowIndex) => (
              <Piece
                key={rowIndex}
                id={`${rowIndex}-${columnIndex}`}
                player={piece}
                size={pieceSize}
              />
            ))}
          </List>
        </Clickable>
      ))}
    </List>
  )
}
