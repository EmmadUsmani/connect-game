import { io } from "socket.io-client";

import { GameSettings, Events, EventData } from "@connect-game/shared";
import { SERVER_URL } from "../config";

const socket = io(SERVER_URL);

function listen(event: string, listener: Function) {
  socket.on(event, listener);
}

function createRoom(settings: GameSettings, hostName: string) {
  const data: EventData[Events.CreateRoom] = { settings, hostName };
  socket.emit(Events.CreateRoom, data);
}

function joinRoom(code: string, playerName: string) {
  const data: EventData[Events.JoinRoom] = { code, playerName };
  socket.emit(Events.JoinRoom, data);
}

export const server = { listen, createRoom, joinRoom };
