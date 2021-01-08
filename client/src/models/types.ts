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

export const GameMaxNameLen = 16;

export interface GameSettings {
  boardSize: [number, number]; // (number of columns, number of rows)
  winCondition: number; // number of pieces in a row to win
  turnTimer: number; // time per turn (0 means unlimited)
}

export const GameDefaultSettings: GameSettings = {
  boardSize: [7, 6],
  winCondition: 4,
  turnTimer: 0,
};

export const GameOptions: {
  boardSizes: { label: string; value: GameSettings["boardSize"] }[];
  winConditions: { label: string; value: GameSettings["winCondition"] }[];
  turnTimers: { label: string; value: GameSettings["turnTimer"] }[];
} = {
  boardSizes: [
    { label: "7 columns x 6 rows", value: [7, 6] },
    { label: "5 columns x 5 rows", value: [5, 5] },
    { label: "12 columns x 12 rows", value: [12, 12] },
  ],
  winConditions: [
    { label: "3 in a row", value: 3 },
    { label: "4 in a row", value: 4 },
    { label: "5 in a row", value: 5 },
  ],
  turnTimers: [
    { label: "None", value: 0 },
    { label: "5 seconds", value: 5 },
    { label: "30 seconds", value: 30 },
  ],
};

// TODO: move constants to separate file
