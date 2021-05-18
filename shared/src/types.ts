export enum GameColor {
  Blue = "#8CB1F8",
  Green = "#97DC8F",
  Pink = "pink",
  Orange = "orange",
}

export interface GamePlayer {
  name: string; // unique
  color: GameColor;
  isHost: boolean;
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
  code: string;
  settings: GameSettings;
  players: GamePlayer[];
  playing: boolean; //TODO: rename to inProgress
}

export type GameRooms = { [key: string]: GameRoom };

export interface GamePlay {
  board: GameBoard;
  currPlayerIdx: number;
  winner: GameWinner;
  lastCoord: [number, number];
  numFilled: number;
  you: GamePlayer;
}

export interface GameState {
  room: GameRoom;
  play: GamePlay;
}
