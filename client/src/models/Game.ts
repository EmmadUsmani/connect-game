import Player from "./Player";

class Game {
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

    // board is stored as an array of columns
    this._board = [];
    for (let i = 0; i < numCols; i++) {
      const col: (Player | null)[] = [];
      for (let j = 0; j < numRows; j++) {
        col.push(null);
      }
      this._board.push(col);
    }
  }

  placeCircle(colNum: number): void {
    // TODO
  }
}

export default Game;
