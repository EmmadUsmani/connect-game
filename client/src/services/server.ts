import { GameSettings, Events, EventData } from "@connect-game/shared"
import { io } from "socket.io-client"

const socket = io("/")
const listeners: [string, (data: any) => void][] = []

// TODO: can we change type of event from string to Event?
function listen(event: string, listener: (data: any) => void): void {
  socket.on(event, listener)
  listeners.push([event, listener])
}

function removeAllListeners(): void {
  for (let i = listeners.length - 1; i >= 0; i--) {
    const [event, listener] = listeners[i]
    socket.off(event, listener)
    listeners.pop()
  }
}

function createRoom(settings: GameSettings, hostName: string): void {
  const data: EventData[Events.CreateRoom] = { settings, hostName }
  socket.emit(Events.CreateRoom, data)
}

function getRoom(code: string): void {
  const data: EventData[Events.GetRoom] = { code }
  socket.emit(Events.GetRoom, data)
}

function joinRoom(code: string, playerName: string): void {
  const data: EventData[Events.JoinRoom] = { code, playerName }
  socket.emit(Events.JoinRoom, data)
}

function leaveRoom(): void {
  socket.emit(Events.LeaveRoom)
}

function startGame(): void {
  socket.emit(Events.StartGame)
}

function endGame(): void {
  socket.emit(Events.EndGame)
}

function placePiece(colNum: number, rowNum: number): void {
  const data: EventData[Events.PlacePiece] = { colNum, rowNum }
  socket.emit(Events.PlacePiece, data)
}

export const server = {
  listen,
  removeAllListeners,
  createRoom,
  getRoom,
  joinRoom,
  leaveRoom,
  startGame,
  endGame,
  placePiece,
}
