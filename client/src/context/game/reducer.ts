import { GameState, InitialGameState } from "@connect-game/shared";
import { Action, JOIN_ROOM } from "./actions";

export const gameReducer = (state: GameState, action: Action): GameState => {
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
          ...InitialGameState.play,
          you: data.player,
        },
      };

    default:
      return InitialGameState;
  }
};
