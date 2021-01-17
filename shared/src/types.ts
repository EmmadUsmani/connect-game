export enum GameColor {
  Blue = "#8CB1F8",
  Green = "#97DC8F",
  Pink = "pink",
  Orange = "orange",
}

// TODO: add isHost field?
export interface GamePlayer {
  name: string;
  color: GameColor;
}

export type GamePiece = GamePlayer | undefined;

export type GameWinner = GamePlayer | undefined | null; // null if tie

export type GameColumn = GamePiece[];

export type GameBoard = GameColumn[];

export type GameDirection = [-1 | 0 | 1, -1 | 0 | 1];

export interface GameSettings {
  boardSize: [number, number]; // (number of columns, number of rows)
  winCondition: number; // number of pieces in a row to win
  turnTimer: number; // time per turn (0 means unlimited)
}

export interface GameRoom {
  settings: GameSettings;
  players: GamePlayer[];
}

export type GameRooms = { [key: string]: GameRoom };
