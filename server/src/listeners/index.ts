import { Server, Socket } from "socket.io"

import { initPlayListeners } from "./play"
import { initRoomListeners } from "./room"

export interface ExtendedSocket extends Socket {
  code: string
  name: string
}

export function initListeners(io: Server): void {
  io.on("connection", (socket: Socket) => {
    initRoomListeners(socket as ExtendedSocket)
    initPlayListeners(socket as ExtendedSocket)
  })
}
