import { GameState, InitialGameState } from "@connect-game/shared"

import {
  Action,
  JOIN_ROOM,
  PLAYER_JOINED,
  REASSIGN_HOST,
  START_GAME,
  PLACE_PIECE,
  JoinRoomAction,
  PlayerJoinedAction,
  PlayerLeftAction,
  ReassignHostAction,
  PlacePieceAction,
  PLAYER_LEFT,
  UpdateSettingsAction,
  UPDATE_SETTINGS,
} from "./actions"
import { createBoard, updatePiece, updateWinner } from "./utils"

function joinRoomReducer(data: JoinRoomAction["data"]): GameState {
  const {
    room: { code, settings, players },
    player,
  } = data

  return {
    room: { code, settings, players, inProgress: false },
    play: { ...InitialGameState.play, you: player },
  }
}

function playerJoinedReducer(
  state: GameState,
  data: PlayerJoinedAction["data"]
): GameState {
  return {
    ...state,
    room: { ...state.room, players: [...state.room.players, data.player] },
  }
}

function playerLeftReducer(
  state: GameState,
  data: PlayerLeftAction["data"]
): GameState {
  const {
    room: { players },
    play: { currPlayerIdx },
  } = state

  return {
    room: {
      ...state.room,
      players: players.filter((player) => player.name !== data.playerName),
    },
    play: {
      ...state.play,
      currPlayerIdx: currPlayerIdx % (players.length - 1),
    },
  }
}

function reassignHostReducer(
  state: GameState,
  data: ReassignHostAction["data"]
): GameState {
  const {
    room: { players },
    play: { you },
  } = state

  return {
    room: {
      ...state.room,
      players: players.map((player) =>
        player.name === data.playerName
          ? { ...player, isHost: true }
          : { ...player, isHost: false }
      ),
    },
    play: {
      ...state.play,
      you: {
        ...you,
        isHost: you.name === data.playerName,
      },
    },
  }
}

function updateSettingsReducer(
  state: GameState,
  data: UpdateSettingsAction["data"]
): GameState {
  return { ...state, room: { ...state.room, settings: data.settings } }
}

function startGameReducer(state: GameState): GameState {
  const {
    room: {
      settings: { boardSize },
    },
    play: { you },
  } = state
  const {
    play: { currPlayerIdx, winner, lastCoord, numFilled },
  } = InitialGameState

  return {
    ...state,
    play: {
      board: createBoard(boardSize[0], boardSize[1]),
      currPlayerIdx,
      winner,
      lastCoord,
      numFilled,
      you,
    },
  }
}

function placePieceReducer(
  state: GameState,
  data: PlacePieceAction["data"]
): GameState {
  const {
    room: {
      settings: { winCondition },
      players,
    },
    play: { board, currPlayerIdx, numFilled, you },
  } = state
  const { colNum, rowNum } = data

  const updatedBoard = updatePiece(
    colNum,
    rowNum,
    board,
    players[currPlayerIdx]
  )
  return {
    ...state,
    play: {
      board: updatedBoard,
      winner: updateWinner(
        colNum,
        rowNum,
        updatedBoard,
        numFilled + 1,
        winCondition
      ),
      currPlayerIdx: (currPlayerIdx + 1) % players.length,
      lastCoord: [colNum, rowNum],
      numFilled: numFilled + 1,
      you,
    },
  }
}

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case JOIN_ROOM:
      return joinRoomReducer(action.data)
    case PLAYER_JOINED:
      return playerJoinedReducer(state, action.data)
    case PLAYER_LEFT:
      return playerLeftReducer(state, action.data)
    case REASSIGN_HOST:
      return reassignHostReducer(state, action.data)
    case UPDATE_SETTINGS:
      return updateSettingsReducer(state, action.data)
    case START_GAME:
      return startGameReducer(state)
    case PLACE_PIECE:
      return placePieceReducer(state, action.data)
    default:
      return InitialGameState
  }
}
