import { GameBoard, GameColumn, GameSettings } from "@connect-game/shared";

/* Creates blank board with given dimmensions */
export function createBoard(numCols: number, numRows: number): GameBoard {
  const board: GameBoard = [];
  for (let i = 0; i < numCols; i++) {
    const column: GameColumn = [];
    for (let j = 0; j < numRows; j++) {
      column.push(undefined);
    }
    board.push(column);
  }
  return board;
}

/* Converts boardSize to str for use in Picker */
export function boardSizeToStr(boardSize: GameSettings["boardSize"]) {
  return boardSize.join(",");
}

export function strToBoardSize(str: string) {
  return str
    .split(",")
    .map((num) => parseInt(num)) as GameSettings["boardSize"];
}
