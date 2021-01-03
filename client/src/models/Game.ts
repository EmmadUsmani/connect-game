import { GamePlayer, GameBoard, GameColumn, GamePiece } from "./types";

class Game {
  // properties should be immutable to work with React
  private _board: GameBoard;
  private _players: GamePlayer[];
  private _currPlayerIdx: number;
  private _winner: GamePlayer | null;
  private _winCondition: number;
  private static _instance: Game;

  static get instance() {
    if (!this._instance) throw new Error("No Game instance.");
    return this._instance;
  }

  get board() {
    return this._board;
  }

  get currPlayer() {
    return this._players[this._currPlayerIdx];
  }

  get winner() {
    return this._winner;
  }

  private constructor(
    players: GamePlayer[],
    numRows: number,
    numCols: number,
    winCondition: number
  ) {
    this._players = players;
    this._winCondition = winCondition;
    this._currPlayerIdx = 0;
    this._winner = null;

    /* board is stored as an array of columns
    (0, 0) is left col bottom row */
    this._board = [];
    for (let i = 0; i < numCols; i++) {
      const column: GameColumn = [];
      for (let j = 0; j < numRows; j++) {
        column.push(null);
      }
      this._board.push(column);
    }
  }

  static newGame(
    players: GamePlayer[],
    numRows: number = 6,
    numCols: number = 7,
    winCondition: number = 4
  ): Game {
    this._instance = new Game(players, numRows, numCols, winCondition);
    return this._instance;
  }

  placePiece(colNum: number): void {
    const column = this._board[colNum];
    let rowNum = -1;

    for (let j = 0; j < column.length; j++) {
      if (!column[j]) {
        rowNum = j;
        break;
      }
    }

    if (rowNum === -1) return;

    this.updatePiece(colNum, rowNum, this.currPlayer);
    this.updateCurrPlayer();
  }

  /* Immutably change piece on board */
  private updatePiece(colNum: number, rowNum: number, piece: GamePiece): void {
    const newBoard: GameBoard = [];
    const [numCols, numRows] = [this._board.length, this._board[0].length];

    for (let i = 0; i < numCols; i++) {
      const newColumn: GameColumn = [];
      for (let j = 0; j < numRows; j++) {
        newColumn.push(
          i === colNum && j === rowNum ? piece : this._board[i][j]
        );
      }
      newBoard.push(newColumn);
    }

    this._board = newBoard;
    this.checkWinner(colNum, rowNum);
  }

  private updateCurrPlayer(): void {
    this._currPlayerIdx = (this._currPlayerIdx + 1) % this._players.length;
  }

  /* Check if there is a winner at colNum, rowNum */
  private checkWinner(colNum: number, rowNum: number): void {
    const [numCols, numRows] = [this._board.length, this._board[0].length];
    const player = this._board[colNum][rowNum];
    if (!player) return;

    // explores a single direction, defined by colOff and rowOff, and checks how many in row
    const explore = (
      colNum: number,
      rowNum: number,
      colOff: number,
      rowOff: number,
      count: number
    ): boolean => {
      if (count === this._winCondition) return true;
      if (colNum < 0 || rowNum < 0 || colNum >= numCols || rowNum >= numRows)
        return false;
      if (this._board[colNum][rowNum] !== player) return false;

      return explore(
        colNum + colOff,
        rowNum + rowOff,
        colOff,
        rowOff,
        count + 1
      );
    };

    // initialize explore on each of the 8 directions
    const offsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (const [colOff, rowOff] of offsets) {
      if (explore(colNum + colOff, rowNum + rowOff, colOff, rowOff, 1)) {
        this._winner = player;
        console.log(player.name + " won!");
        return;
      }
    }
  }
}

export default Game;
