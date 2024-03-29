import {
  GamePlayer,
  GameColor,
  GameDirection,
  GameSettings,
  GameState,
} from "./types"

export const UninitializedPlayer: GamePlayer = {
  name: "",
  color: GameColor.Blue,
  isHost: false,
}

export const DefaultSettings: GameSettings = {
  boardSize: [7, 6],
  winCondition: 4,
  turnTimer: 0,
}

export const InitialGameState: GameState = {
  room: {
    code: "",
    settings: DefaultSettings,
    players: [],
    inProgress: false,
  },
  play: {
    board: [[]],
    currPlayerIdx: 0,
    winner: undefined,
    lastCoord: [0, 0],
    numFilled: 0,
    you: UninitializedPlayer,
  },
}

export const Directions: { [key: string]: GameDirection } = {
  North: [0, 1],
  South: [0, -1],
  East: [1, 0],
  West: [-1, 0],
  NorthWest: [-1, 1],
  NorthEast: [1, 1],
  SouthWest: [-1, -1],
  SouthEast: [1, -1],
}

export const DirectionPairs = [
  [Directions.North, Directions.South],
  [Directions.East, Directions.West],
  [Directions.NorthWest, Directions.SouthEast],
  [Directions.NorthEast, Directions.SouthWest],
]

export const Options: {
  boardSizes: { label: string; value: GameSettings["boardSize"] }[]
  winConditions: { label: string; value: GameSettings["winCondition"] }[]
  turnTimers: { label: string; value: GameSettings["turnTimer"] }[]
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
}

export const MaxNameLen = 16

export const CodeLen = 7

export const CodeChars = [
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
]
