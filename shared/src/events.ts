import { GameSettings, GamePlayer, GameRoom } from "./types";

export enum Events {
  CreateRoom = "CreateRoom",
  RoomCreated = "RoomCreated",
  JoinRoom = "JoinRoom",
  RoomJoined = "RoomJoined",
  RoomNotFound = "RoomNotFound",
  NameTaken = "NameTaken",
  GameStarted = "GameStarted",
  PlayerJoined = "PlayerJoined",
  StartGame = "StartGame",
  EndGame = "EndGame",
  PlacePiece = "PlacePiece",
  LeaveRoom = "LeaveRoom",
  ReassignHost = "ReassignHost",
}

export interface EventData {
  CreateRoom: {
    settings: GameSettings;
    hostName: string;
  };
  RoomCreated: {
    code: string;
    player: GamePlayer;
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
  PlacePiece: {
    colNum: number;
    rowNum: number;
  };
  LeaveRoom: {
    playerName: string;
  };
  ReassignHost: {
    playerName: string;
  };
}
