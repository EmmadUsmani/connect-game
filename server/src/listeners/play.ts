import { EventData, Events } from "@connect-game/shared";
import { ExtendedSocket } from ".";

export function initPlayListeners(socket: ExtendedSocket) {
  socket.on(Events.PlacePiece, (data: EventData[Events.PlacePiece]) => {
    // send to other clients in room
    socket.to(socket.code).emit(Events.PlacePiece, data);
  });
}
