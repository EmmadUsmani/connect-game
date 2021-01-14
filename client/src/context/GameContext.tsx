import React, { createContext, useState } from "react";

import {
  GamePlayer,
  GameBoard,
  GameColumn,
  GamePiece,
  GameWinner,
  GameDirectionPairs,
  // Events,
  // EventData,
  GameSettings,
} from "@connect-game/shared";

interface GameCtxInterface {
  board: GameBoard;
  players: GamePlayer[];
  currPlayerIdx: number;
  winner: GameWinner;
  createRoom(host: GamePlayer, settings: GameSettings): void;
  startGame(): void;
  placePiece(colNum: number): void;
}

export const GameContext = createContext<GameCtxInterface>({
  board: [],
  players: [],
  currPlayerIdx: 0,
  winner: undefined,
  createRoom: (host, settings) => null,
  startGame: () => null,
  placePiece: (colNum) => null,
});

export const GameContextProvider: React.FC = ({ children }) => {
  const [board, setBoard] = useState<GameBoard>([]);
  const [players, setPlayers] = useState<GamePlayer[]>([]);
  const [currPlayerIdx, setCurrPlayerIdx] = useState<number>(0);
  const [winner, setWinner] = useState<GameWinner>(undefined);
  /* Private Attributes */
  const [numFilled, setNumFilled] = useState<number>(0);
  const [winCondition, setWinCondition] = useState<number>(0);

  const createRoom = (host: GamePlayer, settings: GameSettings): void => {
    // TODO: socket emit create room
    updateSettings(settings);
  };

  const startGame = (): void => {
    const [numCols, numRows] = [board.length, board[0].length];
    createBoard(numCols, numRows);
    setWinner(undefined);
    setCurrPlayerIdx(0);
    setNumFilled(0);
  };

  const placePiece = (colNum: number): void => {
    if (winner || winner === null) return;
    const column = board[colNum];
    let rowNum = -1;

    for (let j = 0; j < column.length; j++) {
      if (!column[j]) {
        rowNum = j;
        break;
      }
    }

    if (rowNum === -1) return;

    setNumFilled((numFilled) => numFilled + 1);

    updatePiece(colNum, rowNum, players[currPlayerIdx]);
    updateCurrPlayer();
  };

  /******************** Private Methods ********************/

  const updateSettings = (settings: GameSettings): void => {
    const {
      boardSize: [numCols, numRows],
      winCondition,
    } = settings;
    setWinCondition(winCondition);
    createBoard(numCols, numRows);
  };

  // TODO: refactor to utils?
  const createBoard = (numCols: number, numRows: number): void => {
    const board: GameBoard = [];
    for (let i = 0; i < numCols; i++) {
      const column: GameColumn = [];
      for (let j = 0; j < numRows; j++) {
        column.push(undefined);
      }
      board.push(column);
    }
    setBoard(board);
  };

  const updatePiece = (
    colNum: number,
    rowNum: number,
    piece: GamePiece
  ): void => {
    const newBoard: GameBoard = [];
    const [numCols, numRows] = [board.length, board[0].length];

    for (let i = 0; i < numCols; i++) {
      const newColumn: GameColumn = [];
      for (let j = 0; j < numRows; j++) {
        newColumn.push(i === colNum && j === rowNum ? piece : board[i][j]);
      }
      newBoard.push(newColumn);
    }

    setBoard(newBoard);
    checkWinner(colNum, rowNum);
    checkTie();
  };

  const updateCurrPlayer = (): void => {
    setCurrPlayerIdx((currPlayerIdx) => (currPlayerIdx + 1) % players.length);
  };

  const checkWinner = (colNum: number, rowNum: number): void => {
    const [numCols, numRows] = [board.length, board[0].length];
    const player = board[colNum][rowNum];
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
      if (board[colNum][rowNum] !== player) return count;

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
      if (count >= winCondition) {
        setWinner(player);
        return;
      }
    }
  };

  const checkTie = (): void => {
    const [numCols, numRows] = [board.length, board[0].length];
    if (numFilled === numCols * numRows && winner === undefined)
      setWinner(null);
  };

  return (
    <GameContext.Provider
      value={{
        board,
        players,
        currPlayerIdx,
        winner,
        createRoom,
        startGame,
        placePiece,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
