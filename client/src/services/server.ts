import { io } from "socket.io-client";

import {
  GamePlayer,
  GameSettings,
  Events,
  EventData,
} from "@connect-game/shared";
import { SERVER_URL } from "../config";

const socket = io(SERVER_URL);

function listen(event: string, listener: Function) {
  socket.on(event, listener);
}

function createRoom(settings: GameSettings, host: GamePlayer) {
  const data: EventData[Events.CreateRoom] = { settings, host };
  socket.emit(Events.CreateRoom, data);
}

export const server = { listen, createRoom };
