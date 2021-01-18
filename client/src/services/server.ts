import { io } from "socket.io-client";

import { GameSettings, Events, EventData } from "@connect-game/shared";
import { SERVER_URL } from "../config";

const socket = io(SERVER_URL);

function listen(event: string, listener: Function): void {
  socket.on(event, listener);
}

function removeListener(event: string, listener: Function): void {
  socket.off(event, listener);
}

function createRoom(settings: GameSettings, hostName: string): void {
  const data: EventData[Events.CreateRoom] = { settings, hostName };
  socket.emit(Events.CreateRoom, data);
}

function joinRoom(code: string, playerName: string): void {
  const data: EventData[Events.JoinRoom] = { code, playerName };
  socket.emit(Events.JoinRoom, data);
}

function startGame(): void {
  socket.emit(Events.StartGame);
}

function placePiece(colNum: number, rowNum: number): void {
  const data: EventData[Events.PlacePiece] = { colNum, rowNum };
  socket.emit(Events.PlacePiece, data);
}

export const server = {
  listen,
  removeListener,
  createRoom,
  joinRoom,
  startGame,
  placePiece,
};
