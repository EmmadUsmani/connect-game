import { GameSettings, GamePlayer, GameRoom } from "./types";

export enum Events {
  CreateRoom = "CreateRoom",
  JoinRoom = "JoinRoom",
  RoomJoined = "RoomJoined",
  RoomNotFound = "RoomNotFound",
  NameTaken = "NameTaken",
  InProgress = "InProgress",
  PlayerJoined = "PlayerJoined",
  StartGame = "StartGame", // TODO: separate GameStarted for other clients?
  EndGame = "EndGame", // TODO: separate GameEnded?
  PlacePiece = "PlacePiece", // TODO: piecePlaced for symmetry?
  LeaveRoom = "LeaveRoom", // TODO: create separate PlayerLeft action for better naming
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
