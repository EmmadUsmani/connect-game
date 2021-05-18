import { Events, EventData } from "@connect-game/shared";

// action names
export const JOIN_ROOM = "JOIN_ROOM";
export const PLAYER_JOINED = "PLAYER_JOINED";
export const PLAYER_LEFT = "PLAYER_LEFT";
export const REASSIGN_HOST = "REASSIGN_HOST";
export const START_GAME = "START_GAME";
export const PLACE_PIECE = "PLACE_PIECE";

// action ts types
export interface JoinRoomAction {
  type: typeof JOIN_ROOM;
  data: EventData[Events.RoomJoined];
}

export interface PlayerJoinedAction {
  type: typeof PLAYER_JOINED;
  data: EventData[Events.PlayerJoined];
}

export interface PlayerLeftAction {
  type: typeof PLAYER_LEFT;
  data: EventData[Events.PlayerLeft];
}

export interface ReassignHostAction {
  type: typeof REASSIGN_HOST;
  data: EventData[Events.ReassignHost];
}

export interface StartGameAction {
  type: typeof START_GAME;
}

export interface PlacePieceAction {
  type: typeof PLACE_PIECE;
  data: EventData[Events.PlacePiece];
}

export type Action =
  | JoinRoomAction
  | PlayerJoinedAction
  | PlayerLeftAction
  | ReassignHostAction
  | StartGameAction
  | PlacePieceAction;

// action creators
export const joinRoomAction = (
  data: JoinRoomAction["data"]
): JoinRoomAction => ({ type: JOIN_ROOM, data });

export const playerJoinedAction = (
  data: PlayerJoinedAction["data"]
): PlayerJoinedAction => ({ type: PLAYER_JOINED, data });

export const playerLeftAction = (
  data: PlayerLeftAction["data"]
): PlayerLeftAction => ({ type: PLAYER_LEFT, data });

export const reassignHostAction = (
  data: ReassignHostAction["data"]
): ReassignHostAction => ({ type: REASSIGN_HOST, data });

export const startGameAction = (): StartGameAction => ({ type: START_GAME });

export const placePieceAction = (
  data: PlacePieceAction["data"]
): PlacePieceAction => ({ type: PLACE_PIECE, data });
