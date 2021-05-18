import { Events, EventData } from "@connect-game/shared";

// action names
export const JOIN_ROOM = "JOIN_ROOM";

// action ts types
interface JoinRoomAction {
  type: typeof JOIN_ROOM;
  data: EventData[Events.RoomJoined];
}

export type Action = JoinRoomAction;

// action creators
export const joinRoom = (data: JoinRoomAction["data"]): JoinRoomAction => ({
  type: JOIN_ROOM,
  data,
});
