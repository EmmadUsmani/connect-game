import { GameState, InitialGameState } from "@connect-game/shared";
import {
  Action,
  JOIN_ROOM,
  PLAYER_JOINED,
  LEAVE_ROOM,
  JoinRoomAction,
  PlayerJoinedAction,
  LeaveRoomAction,
} from "./actions";

export const gameReducer = (state: GameState, action: Action): GameState => {
  const { type, data } = action;

  switch (type) {
    case JOIN_ROOM:
      const joinRoomData = data as JoinRoomAction["data"];
      return {
        room: {
          code: joinRoomData.room.code,
          settings: joinRoomData.room.settings,
          players: joinRoomData.room.players,
          playing: false,
        },
        play: {
          ...InitialGameState.play,
          you: joinRoomData.player,
        },
      };

    case PLAYER_JOINED:
      const playerJoinedData = data as PlayerJoinedAction["data"];
      return {
        ...state,
        room: {
          ...state.room,
          players: [...state.room.players, playerJoinedData.player],
        },
      };

    case LEAVE_ROOM:
      const leaveRoomData = data as LeaveRoomAction["data"];
      return {
        room: {
          ...state.room,
          players: state.room.players.filter(
            (player) => player.name !== leaveRoomData.playerName
          ),
        },
        play: {
          ...state.play,
          currPlayerIdx:
            state.play.currPlayerIdx % (state.room.players.length - 1),
        },
      };

    default:
      return InitialGameState;
  }
};
