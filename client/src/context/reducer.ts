import {
  GameState,
  GameBoard,
  GameColumn,
  InitialGameState,
} from "@connect-game/shared";

// TODO: strict typing for actions

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

// action types // TODO: action creators
export const JOIN_ROOM = "JOIN_ROOM";

export const gameReducer = (state: GameState, action: any): GameState => {
  const { type, data } = action;

  switch (type) {
    case JOIN_ROOM:
      return {
        room: {
          code: data.room.code,
          settings: data.room.settings,
          players: data.room.players,
          playing: false,
        },
        play: {
          ...state.play,
          you: data.player,
        },
      };

    default:
      return InitialGameState;
  }
};
