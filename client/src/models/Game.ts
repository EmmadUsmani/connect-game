import Player from "./Player";

class Game {
  // properties should be immutable to work with React
  private _board: (Player | null)[][];
  private _players: Player[];
  private _currPlayerIdx: number;

  get board() {
    return this._board;
  }

  get currPlayer() {
    return this._players[this._currPlayerIdx];
  }

  constructor(players: Player[], numRows: number = 6, numCols: number = 7) {
    this._players = players;
    this._currPlayerIdx = 0;

    /* board is stored as an array of columns
    (0, 0) is left col bottom row */
    this._board = [];
    for (let i = 0; i < numCols; i++) {
      const column: (Player | null)[] = [];
      for (let j = 0; j < numRows; j++) {
        column.push(null);
      }
      this._board.push(column);
    }
  }

  placeCircle(colNum: number): void {
    const column = this._board[colNum];
    let rowNum = -1;

    for (let j = 0; j < column.length; j++) {
      if (!column[j]) {
        console.log("placing piece");
        rowNum = j;
        break;
      }
    }

    if (rowNum === -1) {
      console.log("column full");
      return;
    }

    this.updatePiece(colNum, rowNum, this._players[this._currPlayerIdx]);
    this.updateCurrPlayer();
  }

  /* Immutably change piece on board */
  private updatePiece(colNum: number, rowNum: number, player: Player) {
    const newBoard: (Player | null)[][] = [];
    const [numCols, numRows] = [this._board.length, this._board[0].length];

    for (let i = 0; i < numCols; i++) {
      const newColumn: (Player | null)[] = [];
      for (let j = 0; j < numRows; j++) {
        newColumn.push(
          i === colNum && j === rowNum ? player : this._board[i][j]
        );
      }
      newBoard.push(newColumn);
    }

    this._board = newBoard;
  }

  private updateCurrPlayer() {
    this._currPlayerIdx = (this._currPlayerIdx + 1) % this._players.length;
  }
}

export default Game;
