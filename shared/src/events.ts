import { GameSettings } from ".";

export enum Events {
  CreateRoom = "CreateRoom",
}

/* TODO: consider using Game types instead of redefining things like 
board size */
export interface EventData {
  CreateRoom: {
    settings: GameSettings;
    name: string;
  };
}
