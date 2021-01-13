import { EventNames, EventData } from "@connect-game/shared";
import {
  GamePlayer,
  GameBoard,
  GameColumn,
  GamePiece,
  GameWinner,
  GameDirectionPairs,
} from "./types";
import { socket } from "../services";

class Game {
  // TODO: preface private method names with _
  // TODO: make numCols and numRows properties
  // TODO: gameState property to abstract turn, won, draw
  // properties should be immutable to work with React
  private _board: GameBoard;
  private _players: GamePlayer[];
  private _currPlayerIdx: number;
  private _winner: GameWinner; // null if tie
  private _winCondition: number;
  private _numFilled: number;
  private static _instance: Game;

  static get instance() {
    if (!this._instance) throw new Error("No Game instance.");
    return this._instance;
  }

  get board() {
    return this._board;
  }

  get players() {
    return this._players;
  }

  get currPlayer() {
    return this._players[this._currPlayerIdx];
  }

  get winner() {
    return this._winner;
  }

  private constructor(
    players: GamePlayer[],
    numCols: number,
    numRows: number,
    winCondition: number
  ) {
    this._players = players;
    this._winCondition = winCondition;
    this._currPlayerIdx = 0;
    this._winner = undefined;
    this._numFilled = 0;
    this._board = this.createBoard(numCols, numRows);
  }

  // TODO: rename to createGame
  static newGame(
    players: GamePlayer[],
    numCols: number = 7,
    numRows: number = 6,
    winCondition: number = 4
  ): Game {
    const data: EventData[EventNames.CreateRoom] = {
      numCols,
      numRows,
      winCondition,
    };
    socket.emit(EventNames.CreateRoom, data);

    this._instance = new Game(players, numCols, numRows, winCondition);
    return this._instance;
  }

  /* Used to start game after returning to lobby */
  start(): void {
    const [numCols, numRows] = [this._board.length, this._board[0].length];
    this._board = this.createBoard(numCols, numRows);
    this._winner = undefined;
    this._currPlayerIdx = 0;
    this._numFilled = 0;
  }

  placePiece(colNum: number): void {
    if (this.winner || this.winner === null) return;
    const column = this._board[colNum];
    let rowNum = -1;

    for (let j = 0; j < column.length; j++) {
      if (!column[j]) {
        rowNum = j;
        break;
      }
    }

    if (rowNum === -1) return;

    this._numFilled += 1;
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
    this.checkTie();
  }

  private updateCurrPlayer(): void {
    this._currPlayerIdx = (this._currPlayerIdx + 1) % this._players.length;
  }

  /* Returns a new, blank board. 
  Board is stored as an array of columns,
  (0, 0) is left col bottom row */
  private createBoard(numCols: number, numRows: number): GameBoard {
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
    ): number => {
      if (colNum < 0 || rowNum < 0 || colNum >= numCols || rowNum >= numRows)
        return count;
      if (this._board[colNum][rowNum] !== player) return count;

      return explore(
        colNum + colOff,
        rowNum + rowOff,
        colOff,
        rowOff,
        count + 1
      );
    };

    /* for each pair of direction (i.e. North & South), 
    check if the player's pieces in those directions sum to winCondition */
    for (const [[colOff1, rowOff1], [colOff2, rowOff2]] of GameDirectionPairs) {
      const count =
        1 +
        explore(colNum + colOff1, rowNum + rowOff1, colOff1, rowOff1, 0) +
        explore(colNum + colOff2, rowNum + rowOff2, colOff2, rowOff2, 0);
      if (count >= this._winCondition) {
        this._winner = player;
        return;
      }
    }
  }

  /* Check if game is at a tie (all pieces filled), 
  should call checkWinner before/after */
  private checkTie(): void {
    const [numCols, numRows] = [this._board.length, this._board[0].length];
    if (this._numFilled === numCols * numRows && this._winner === undefined)
      this._winner = null;
  }
}

export default Game;
