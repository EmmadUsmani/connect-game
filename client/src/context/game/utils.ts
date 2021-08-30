import {
  GameBoard,
  GameColumn,
  GamePiece,
  GameWinner,
  DirectionPairs,
} from "@connect-game/shared"

/* Creates blank board with given dimmensions */
export function createBoard(numCols: number, numRows: number): GameBoard {
  const board: GameBoard = []
  for (let i = 0; i < numCols; i++) {
    const column: GameColumn = []
    for (let j = 0; j < numRows; j++) {
      column.push(undefined)
    }
    board.push(column)
  }
  return board
}

/* Returns the index of the first empty row (topmost) in a column, or -1 if the column is full */
export function getEmptyRowNum(board: GameBoard, colNum: number): number {
  const column = board[colNum]
  let rowNum = -1
  for (let i = 0; i < column.length; i++) {
    if (!column[i]) {
      rowNum = i
      break
    }
  }
  return rowNum
}

/* Updates board after placing piece in given coordinate */
export function updatePiece(
  colNum: number,
  rowNum: number,
  board: GameBoard,
  piece: GamePiece
): GameBoard {
  const newBoard: GameBoard = []
  const [numCols, numRows] = [board.length, board[0].length]

  for (let i = 0; i < numCols; i++) {
    const newColumn: GameColumn = []
    for (let j = 0; j < numRows; j++) {
      newColumn.push(i === colNum && j === rowNum ? piece : board[i][j])
    }
    newBoard.push(newColumn)
  }

  return newBoard
}

/* Check if any player has won the game, or if it's a tie */
export function updateWinner(
  colNum: number,
  rowNum: number,
  board: GameBoard,
  numFilled: number,
  winCondition: number
): GameWinner {
  const [numCols, numRows] = [board.length, board[0].length]
  const player = board[colNum][rowNum]
  if (!player) {
    return undefined
  }

  /* explores a single direction, defined by colOff and rowOff, 
  and checks how many in row */
  const explore = (
    colNum: number,
    rowNum: number,
    colOff: number,
    rowOff: number,
    count: number
  ): number => {
    if (colNum < 0 || rowNum < 0 || colNum >= numCols || rowNum >= numRows) {
      return count
    }
    if (board[colNum][rowNum] !== player) {
      return count
    }

    return explore(colNum + colOff, rowNum + rowOff, colOff, rowOff, count + 1)
  }

  /* for each pair of direction (i.e. North & South), 
  check if the player's pieces in those directions sum to winCondition */
  for (const [[colOff1, rowOff1], [colOff2, rowOff2]] of DirectionPairs) {
    const count =
      1 +
      explore(colNum + colOff1, rowNum + rowOff1, colOff1, rowOff1, 0) +
      explore(colNum + colOff2, rowNum + rowOff2, colOff2, rowOff2, 0)
    if (count >= winCondition) {
      return player
    }
  }

  /* check if game is a tie */
  if (numFilled === numCols * numRows) {
    return null
  }

  return undefined
}
