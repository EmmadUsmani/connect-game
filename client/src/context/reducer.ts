import {
  GameBoard,
  GameColumn,
  GameDefaultSettings,
  GamePlayer,
  GameSettings,
  GameWinner,
  UninitializedPlayer,
} from "@connect-game/shared";

export interface GameState {
  code: string;
  board: GameBoard;
  players: GamePlayer[];
  you: GamePlayer;
  currPlayerIdx: number;
  winner: GameWinner;
  lastCoord: [number, number];
  numFilled: number;
  settings: GameSettings;
}

/* TODO: consider creating seperate room & play (or game?) slices, 
room: {settings, code, players, playing} 
would match the structure of shared types
perhaps rename to global
*/
export const initialGameState: GameState = {
  code: "",
  board: [[]],
  players: [],
  you: UninitializedPlayer,
  currPlayerIdx: 0,
  winner: undefined,
  lastCoord: [0, 0],
  numFilled: 0,
  settings: GameDefaultSettings,
};

// helper functions
const createBoard = (numCols: number, numRows: number): GameBoard => {
  const board: GameBoard = [];
  for (let i = 0; i < numCols; i++) {
    const column: GameColumn = [];
    for (let j = 0; j < numRows; j++) {
      column.push(undefined);
    }
    board.push(column);
  }
  return board;
};

// action types
export const JOIN_ROOM = "JOIN_ROOM";
// export const START_GAME = "START_GAME";

// TODO: action creators

export const gameReducer = (state: GameState, action: any): GameState => {
  const { type, data } = action;

  switch (type) {
    case JOIN_ROOM:
      return {
        ...state,
        code: data.room.code,
        you: data.player,
        players: data.room.players,
        settings: data.room.settings,
      };

    // case START_GAME:
    //   return {
    //     ...state,
    //     board: createBoard(state.board.length, state.board[0].length),
    //     winner: undefined,
    //     currPlayerIdx: 0,
    //     numFilled: 0,
    //   };
    default:
      return initialGameState;
  }
};
