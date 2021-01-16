import { GameSettings, GamePlayer } from "./types";

export enum Events {
  CreateRoom = "CreateRoom",
  RoomCreated = "RoomCreated",
}

export interface EventData {
  CreateRoom: {
    settings: GameSettings;
    host: GamePlayer;
  };
  RoomCreated: {
    code: string;
  };
}
