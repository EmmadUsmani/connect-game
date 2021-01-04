export enum GameColor {
  Blue = "#8CB1F8",
  Green = "#97DC8F",
  Pink = "pink",
  Orange = "orange",
}

export interface GamePlayer {
  name: string;
  color: GameColor;
}

export type GamePiece = GamePlayer | null;

export type GameColumn = GamePiece[];

export type GameBoard = GameColumn[];

export type GameDirection = [-1 | 0 | 1, -1 | 0 | 1];

export const GameDirections: { [key: string]: GameDirection } = {
  North: [0, 1],
  South: [0, -1],
  East: [1, 0],
  West: [-1, 0],
  NorthWest: [-1, 1],
  NorthEast: [1, 1],
  SouthWest: [-1, -1],
  SouthEast: [1, -1],
};

export const GameDirectionPairs = [
  [GameDirections.North, GameDirections.South],
  [GameDirections.East, GameDirections.West],
  [GameDirections.NorthWest, GameDirections.SouthEast],
  [GameDirections.NorthEast, GameDirections.SouthWest],
];
