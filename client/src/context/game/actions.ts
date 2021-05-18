import { Events, EventData } from "@connect-game/shared";

// action names
export const JOIN_ROOM = "JOIN_ROOM";
export const PLAYER_JOINED = "PLAYER_JOINED";
export const LEAVE_ROOM = "LEAVE_ROOM"; // TODO: rename PLAYER_LEFT
export const REASSIGN_HOST = "REASSIGN_HOST";

// action ts types
export interface JoinRoomAction {
  type: typeof JOIN_ROOM;
  data: EventData[Events.RoomJoined];
}

export interface PlayerJoinedAction {
  type: typeof PLAYER_JOINED;
  data: EventData[Events.PlayerJoined];
}

export interface LeaveRoomAction {
  type: typeof LEAVE_ROOM;
  data: EventData[Events.LeaveRoom];
}

export interface ReassignHostAction {
  type: typeof REASSIGN_HOST;
  data: EventData[Events.ReassignHost];
}

export type Action =
  | JoinRoomAction
  | PlayerJoinedAction
  | LeaveRoomAction
  | ReassignHostAction;

// action creators
export const joinRoomAction = (
  data: JoinRoomAction["data"]
): JoinRoomAction => ({ type: JOIN_ROOM, data });

export const playerJoinedAction = (
  data: PlayerJoinedAction["data"]
): PlayerJoinedAction => ({ type: PLAYER_JOINED, data });

export const leaveRoomAction = (
  data: LeaveRoomAction["data"]
): LeaveRoomAction => ({ type: LEAVE_ROOM, data });

export const reassignHostAction = (
  data: ReassignHostAction["data"]
): ReassignHostAction => ({ type: REASSIGN_HOST, data });
