import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  GamePlayer,
  GameBoard,
  GameColumn,
  GamePiece,
  GameWinner,
  GameDirectionPairs,
  Events,
  EventData,
  GameSettings,
  GameColor,
  uninitializedPlayer,
} from "@connect-game/shared";
import { server } from "../services";

interface GameCtxInterface {
  code: string;
  board: GameBoard;
  players: GamePlayer[];
  you: GamePlayer;
  currPlayerIdx: number;
  winner: GameWinner;
  createRoom(settings: GameSettings, host: GamePlayer): void;
  joinRoom(code: string, playerName: string): void;
  startGame(): void;
  placePiece(colNum: number): void;
}

export const GameContext = createContext<GameCtxInterface>({
  code: "",
  board: [[]],
  players: [],
  you: uninitializedPlayer,
  currPlayerIdx: 0,
  winner: undefined,
  createRoom: (_, _2) => null,
  joinRoom: (_, _2) => null,
  startGame: () => null,
  placePiece: (_) => null,
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC = ({ children }) => {
  const [code, setCode] = useState<string>("");
  const [board, setBoard] = useState<GameBoard>([[]]);
  const [players, setPlayers] = useState<GamePlayer[]>([]);
  const [you, setYou] = useState<GamePlayer>(uninitializedPlayer);
  const [currPlayerIdx, setCurrPlayerIdx] = useState<number>(0);
  const [winner, setWinner] = useState<GameWinner>(undefined);
  /* Private Attributes */
  const [lastCoord, setLastCoord] = useState<[number, number]>([0, 0]);
  const [numFilled, setNumFilled] = useState<number>(0);
  const [winCondition, setWinCondition] = useState<number>(0);

  const createRoom = (settings: GameSettings, host: GamePlayer): void => {
    server.createRoom(settings, host);
    updateSettings(settings);
    setPlayers([host]);
    setYou(host);
  };

  const joinRoom = (code: string, playerName: string): void => {
    // TODO: handle nonexistant room
    server.joinRoom(code, playerName);
    setCode(code);
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
    setLastCoord([colNum, rowNum]);
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
  };

  const updateCurrPlayer = (): void => {
    setCurrPlayerIdx((currPlayerIdx) => (currPlayerIdx + 1) % players.length);
  };

  const checkWinner = useCallback(
    (colNum: number, rowNum: number): void => {
      const [numCols, numRows] = [board.length, board[0].length];
      const player = board[colNum][rowNum];
      if (!player) {
        return;
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
      for (const [
        [colOff1, rowOff1],
        [colOff2, rowOff2],
      ] of GameDirectionPairs) {
        const count =
          1 +
          explore(colNum + colOff1, rowNum + rowOff1, colOff1, rowOff1, 0) +
          explore(colNum + colOff2, rowNum + rowOff2, colOff2, rowOff2, 0);
        if (count >= winCondition) {
          setWinner(player);
          return;
        }
      }
    },
    [board, winCondition]
  );

  const checkTie = useCallback((): void => {
    const [numCols, numRows] = [board.length, board[0].length];
    if (numFilled === numCols * numRows && winner === undefined)
      setWinner(null);
  }, [board, numFilled, winner]);

  /* Register listeners */
  // TODO: move listener funcs to outside of hook
  useEffect(() => {
    server.listen(Events.RoomCreated, (data: EventData[Events.RoomCreated]) =>
      setCode(data.code)
    );
    server.listen(Events.RoomJoined, (data: EventData[Events.RoomJoined]) => {
      const { room, player } = data;
      setPlayers(room.players);
      setYou(player);
    });
    server.listen(
      Events.PlayerJoined,
      (data: EventData[Events.PlayerJoined]) => {
        const { player } = data;
        setPlayers((players) => [...players, player]);
      }
    );
  }, []);

  /* Check winner after each move */
  useEffect(() => {
    checkWinner(...lastCoord);
    checkTie();
  }, [lastCoord, checkWinner, checkTie]);

  return (
    <GameContext.Provider
      value={{
        code,
        board,
        players,
        you,
        currPlayerIdx,
        winner,
        createRoom,
        joinRoom,
        startGame,
        placePiece,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
