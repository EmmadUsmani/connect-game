import { GameSettings, GamePlayer, GameRoom } from "./types";

export enum Events {
  CreateRoom = "CreateRoom",
  JoinRoom = "JoinRoom",
  RoomJoined = "RoomJoined",
  PlayerJoined = "PlayerJoined",
  LeaveRoom = "LeaveRoom",
  PlayerLeft = "PlayerLeft",
  ReassignHost = "ReassignHost",
  StartGame = "StartGame", // TODO: separate GameStarted for other clients?
  EndGame = "EndGame", // TODO: separate GameEnded?
  PlacePiece = "PlacePiece", // TODO: piecePlaced for symmetry?
  RoomNotFound = "RoomNotFound",
  NameTaken = "NameTaken",
  InProgress = "InProgress",
}

export interface EventData {
  CreateRoom: {
    settings: GameSettings;
    hostName: string;
  };
  JoinRoom: {
    code: string;
    playerName: string;
  };
  RoomJoined: {
    room: GameRoom;
    player: GamePlayer;
  };
  PlayerJoined: {
    player: GamePlayer;
  };
  PlayerLeft: {
    playerName: string;
  };
  ReassignHost: {
    playerName: string;
  };
  PlacePiece: {
    colNum: number;
    rowNum: number;
  };
}
