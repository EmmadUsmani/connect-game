export enum GameColor {
  Blue = "#8CB1F8",
  Green = "#97DC8F",
}

export interface GamePlayer {
  name: string;
  color: GameColor;
}

export type GamePiece = GamePlayer | null;

export type GameColumn = GamePiece[];

export type GameBoard = GameColumn[];
