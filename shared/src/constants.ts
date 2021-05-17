import { GamePlayer, GameColor, GameDirection, GameSettings } from "./types";

export const UninitializedPlayer: GamePlayer = {
  name: "",
  color: GameColor.Blue,
  isHost: false,
};

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

export const GameMaxNameLen = 16;

export const GameCodeLen = 7;

export const GameCodeChars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
