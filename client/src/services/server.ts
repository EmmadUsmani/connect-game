import { GameSettings, Events, EventData } from "@connect-game/shared"
import { io } from "socket.io-client"

export type ListenerId = number

const socket = io("/")
const listeners: { [key: number]: [Events, (data: any) => void] } = {}
let nextListenerId = 0

function listen(event: Events, listener: (data: any) => void): ListenerId {
  socket.on(event, listener)
  listeners[nextListenerId] = [event, listener]
  return nextListenerId++
}

function removeListener(listenerId: ListenerId): void {
  const [event, listener] = listeners[listenerId]
  socket.off(event, listener)
  delete listeners[listenerId]
}

function removeListeners(listenerIds: ListenerId[]): void {
  listenerIds.map((id) => removeListener(id))
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
  removeListener,
  removeListeners,
  createRoom,
  getRoom,
  joinRoom,
  leaveRoom,
  startGame,
  endGame,
  placePiece,
}
