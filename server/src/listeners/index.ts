import { Server, Socket } from "socket.io";

import { initRoomListeners } from "./room";

export function initListeners(io: Server): void {
  io.on("connection", (socket: Socket) => {
    initRoomListeners(socket);
  });
}
