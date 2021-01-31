import { Server, Socket } from "socket.io";

import { initRoomListeners } from "./room";
import { initPlayListeners } from "./play";

export interface ExtendedSocket extends Socket {
  code: string;
  name: string;
}

export function initListeners(io: Server): void {
  io.on("connection", (socket: Socket) => {
    initRoomListeners(socket as ExtendedSocket);
    initPlayListeners(socket as ExtendedSocket);
  });
}
