import {
  Events,
  EventData,
  GameSettings,
  GameState,
  InitialGameState,
} from "@connect-game/shared"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import { useHistory } from "react-router-dom"

import { server } from "../../services"

import {
  joinRoomAction,
  placePieceAction,
  playerJoinedAction,
  playerLeftAction,
  reassignHostAction,
  startGameAction,
} from "./actions"
import { gameReducer } from "./reducer"

interface GameProviderProps {
  children: React.ReactNode
}

interface GameCtxInterface {
  gameState: GameState
  createRoom(settings: GameSettings, hostName: string): void
  joinRoom(code: string, playerName: string): void
  leaveRoom(): void
  startGame(): void
  endGame(): void
  placePiece(colNum: number): void
}

const GameContext = createContext<GameCtxInterface>({
  gameState: InitialGameState,
  createRoom: (_, _2) => null,
  joinRoom: (_, _2) => null,
  leaveRoom: () => null,
  startGame: () => null,
  endGame: () => null,
  placePiece: () => null,
})

export const useGame = () => useContext(GameContext)

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, dispatch] = useReducer(gameReducer, InitialGameState)
  const history = useHistory()

  const createRoom = (settings: GameSettings, hostName: string): void => {
    server.createRoom(settings, hostName)
  }

  const joinRoom = (code: string, playerName: string): void => {
    server.joinRoom(code, playerName)
  }

  const leaveRoom = (): void => {
    server.leaveRoom()
  }

  const startGame = (): void => {
    server.startGame()
    dispatch(startGameAction())
    history.push("/play")
  }

  const endGame = (): void => {
    server.endGame()
    history.push("/room")
  }

  const placePiece = (colNum: number): void => {
    const { board, currPlayerIdx, winner, you } = gameState.play
    const { players } = gameState.room

    if (winner || winner === null) {
      return
    }
    if (players[currPlayerIdx].name !== you.name) {
      return
    }

    const column = board[colNum]
    let rowNum = -1
    for (let j = 0; j < column.length; j++) {
      if (!column[j]) {
        rowNum = j
        break
      }
    }
    if (rowNum === -1) {
      return
    }

    server.placePiece(colNum, rowNum)
    dispatch(placePieceAction({ colNum, rowNum }))
  }

  /* Register listeners */
  useEffect(() => {
    server.listen(Events.RoomJoined, (data: EventData[Events.RoomJoined]) => {
      dispatch(joinRoomAction(data))
    })

    server.listen(
      Events.PlayerJoined,
      (data: EventData[Events.PlayerJoined]) => {
        dispatch(playerJoinedAction(data))
      }
    )

    server.listen(Events.PlayerLeft, (data: EventData[Events.PlayerLeft]) => {
      dispatch(playerLeftAction(data))
    })

    server.listen(
      Events.ReassignHost,
      (data: EventData[Events.ReassignHost]) => {
        dispatch(reassignHostAction(data))
      }
    )

    server.listen(Events.StartGame, () => {
      dispatch(startGameAction())
      history.push("/play")
    })

    server.listen(Events.PlacePiece, (data: EventData[Events.PlacePiece]) => {
      dispatch(placePieceAction(data))
    })

    server.listen(Events.EndGame, () => {
      history.push("/room")
    })

    // Error events
    server.listen(Events.RoomNotFound, () => {
      history.push("/")
    })

    server.listen(Events.NameTaken, () => {
      history.push("/")
    })

    server.listen(Events.InProgress, () => {
      history.push("/")
    })

    return server.removeAllListeners
  }, [history])

  return (
    <GameContext.Provider
      value={{
        gameState,
        createRoom,
        joinRoom,
        leaveRoom,
        startGame,
        endGame,
        placePiece,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
