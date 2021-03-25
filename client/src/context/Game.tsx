import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";

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
  createRoom(settings: GameSettings, hostName: string): void;
  joinRoom(code: string, playerName: string): void;
  startGame(): void;
  placePiece(colNum: number): void;
  clearState(): void;
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
  clearState: () => null,
});

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC = ({ children }) => {
  /* Public Attributes */
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

  const history = useHistory();

  /******************** Public Methods ********************/

  const createRoom = (settings: GameSettings, hostName: string): void => {
    server.createRoom(settings, hostName);
    updateSettings(settings);
  };

  const joinRoom = (code: string, playerName: string): void => {
    server.joinRoom(code, playerName);
    setCode(code);
  };

  const startGame = (): void => {
    server.startGame();
    initGame();
    history.push("/play");
  };

  const placePiece = (colNum: number): void => {
    if (winner || winner === null) return;
    if (players[currPlayerIdx].name !== you.name) return;
    const column = board[colNum];
    let rowNum = -1;

    for (let j = 0; j < column.length; j++) {
      if (!column[j]) {
        rowNum = j;
        break;
      }
    }

    if (rowNum === -1) return;

    server.placePiece(colNum, rowNum);
    setNumFilled((numFilled) => numFilled + 1);
    setLastCoord([colNum, rowNum]);
    updatePiece(colNum, rowNum, players[currPlayerIdx]);
    updateCurrPlayer();
  };

  const clearState = (): void => {
    if (you === uninitializedPlayer) return;
    setCode("");
    setBoard([[]]);
    setPlayers([]);
    setYou(uninitializedPlayer);
    setCurrPlayerIdx(0);
    setWinner(undefined);
    setLastCoord([0, 0]);
    setNumFilled(0);
    setWinCondition(0);
  };

  /******************** Private Methods ********************/

  const updateSettings = useCallback((settings: GameSettings): void => {
    const {
      boardSize: [numCols, numRows],
      winCondition,
    } = settings;
    setWinCondition(winCondition);
    createBoard(numCols, numRows);
  }, []);

  const initGame = useCallback((): void => {
    const [numCols, numRows] = [board.length, board[0].length];
    createBoard(numCols, numRows);
    setWinner(undefined);
    setCurrPlayerIdx(0);
    setNumFilled(0);
  }, [board]);

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

  const updatePiece = useCallback(
    (colNum: number, rowNum: number, piece: GamePiece): void => {
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
    },
    [board]
  );

  const updateCurrPlayer = useCallback((): void => {
    setCurrPlayerIdx((currPlayerIdx) => (currPlayerIdx + 1) % players.length);
  }, [players]);

  /*** Game Loop ***/

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

  /* Check winner/tie after each move (when lastCoord changed) */
  useEffect(() => {
    checkWinner(...lastCoord);
    checkTie();
  }, [lastCoord, checkWinner, checkTie]);

  /*** Server Listeners ***/

  const roomCreatedListener = (data: EventData[Events.RoomCreated]) => {
    setCode(data.code);
    setPlayers([data.player]);
    setYou(data.player);
  };

  const roomJoinedListener = useCallback(
    (data: EventData[Events.RoomJoined]) => {
      setPlayers(data.room.players);
      setYou(data.player);
      updateSettings(data.room.settings);
    },
    [updateSettings]
  );

  const playerJoinedListener = (data: EventData[Events.PlayerJoined]) => {
    setPlayers((players) => [...players, data.player]);
  };

  const roomNotFoundListener = useCallback(() => {
    history.push("/");
  }, [history]);

  const nameTakenListener = useCallback(() => {
    history.push("/");
  }, [history]);

  const startGameListener = useCallback(() => {
    initGame();
    history.push("/play");
  }, [history, initGame]);

  const placePieceListener = useCallback(
    (data: EventData[Events.PlacePiece]) => {
      const { colNum, rowNum } = data;

      setNumFilled((numFilled) => numFilled + 1);
      setLastCoord([colNum, rowNum]);
      updatePiece(colNum, rowNum, players[currPlayerIdx]);
      updateCurrPlayer();
    },
    [currPlayerIdx, players, updatePiece, updateCurrPlayer]
  );

  const leaveRoomListener = useCallback(
    (data: EventData[Events.LeaveRoom]) => {
      const { playerName } = data;

      setCurrPlayerIdx((currPlayerIdx) => currPlayerIdx % (players.length - 1));
      setPlayers((players) =>
        players.filter((player) => player.name !== playerName)
      );
    },
    [players]
  );

  const reassignHostListener = useCallback(
    (data: EventData[Events.ReassignHost]) => {
      const { playerName } = data;

      if (playerName === you.name) {
        setYou({ ...you, isHost: true });
      }

      const newPlayers = [...players];
      for (const p of newPlayers) {
        if (p.name === playerName) p.isHost = true;
      }
      setPlayers(newPlayers);
    },
    [you, players]
  );

  /* Register listeners */
  useEffect(() => {
    server.listen(Events.RoomCreated, roomCreatedListener);
    server.listen(Events.RoomJoined, roomJoinedListener);
    server.listen(Events.RoomNotFound, roomNotFoundListener);
    server.listen(Events.NameTaken, nameTakenListener);
    server.listen(Events.PlayerJoined, playerJoinedListener);
    server.listen(Events.StartGame, startGameListener);
    server.listen(Events.PlacePiece, placePieceListener);
    server.listen(Events.LeaveRoom, leaveRoomListener);
    server.listen(Events.ReassignHost, reassignHostListener);

    return server.removeAllListeners;
  }, [
    roomJoinedListener,
    roomNotFoundListener,
    nameTakenListener,
    startGameListener,
    placePieceListener,
    leaveRoomListener,
    reassignHostListener,
  ]);

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
        clearState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
