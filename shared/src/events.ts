import { GameSettings, GamePlayer, GameRoom } from "./types";

export enum Events {
  CreateRoom = "CreateRoom",
  RoomCreated = "RoomCreated",
  JoinRoom = "JoinRoom",
  RoomJoined = "RoomJoined",
  RoomNotFound = "RoomNotFound",
  NameTaken = "NameTaken",
  PlayerJoined = "PlayerJoined",
}

export interface EventData {
  CreateRoom: {
    settings: GameSettings;
    host: GamePlayer;
  };
  RoomCreated: {
    code: string;
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
