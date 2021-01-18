import { GameSettings, GamePlayer, GameRoom } from "./types";

export enum Events {
  CreateRoom = "CreateRoom",
  RoomCreated = "RoomCreated",
  JoinRoom = "JoinRoom",
  RoomJoined = "RoomJoined",
  RoomNotFound = "RoomNotFound",
  NameTaken = "NameTaken",
  PlayerJoined = "PlayerJoined",
  StartGame = "StartGame",
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
}
