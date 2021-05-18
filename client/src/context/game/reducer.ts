import { GameState, InitialGameState } from "@connect-game/shared";
import {
  Action,
  JOIN_ROOM,
  PLAYER_JOINED,
  LEAVE_ROOM,
  REASSIGN_HOST,
  JoinRoomAction,
  PlayerJoinedAction,
  LeaveRoomAction,
  ReassignHostAction,
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

    case REASSIGN_HOST:
      const reassignHostData = data as ReassignHostAction["data"];
      return {
        room: {
          ...state.room,
          players: state.room.players.map((player) =>
            player.name === reassignHostData.playerName
              ? { ...player, isHost: true }
              : { ...player, isHost: false }
          ),
        },
        play: {
          ...state.play,
          you: {
            ...state.play.you,
            isHost: state.play.you.name === reassignHostData.playerName,
          },
        },
      };

    default:
      return InitialGameState;
  }
};
