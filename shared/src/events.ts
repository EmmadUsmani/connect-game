import { GameSettings, GamePlayer, GameRoom } from "./types";

export enum Events {
  CreateRoom = "CreateRoom",
  JoinRoom = "JoinRoom",
  RoomJoined = "RoomJoined",
  RoomNotFound = "RoomNotFound",
  NameTaken = "NameTaken",
  GameStarted = "GameStarted", //TODO: rename GameStarted to InProgress
  PlayerJoined = "PlayerJoined",
  StartGame = "StartGame",
  EndGame = "EndGame",
  PlacePiece = "PlacePiece",
  LeaveRoom = "LeaveRoom", // TODO: create sepeparate PlayerLeft action for better naming
  ReassignHost = "ReassignHost",
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
