import { Socket } from "socket.io";

import { Events, EventData, GameRooms, GamePlayer } from "@connect-game/shared";
import { generateRoomCode, generateColor } from "../utils";

// TODO: close room once all users have left
const rooms: GameRooms = {};

export function initRoomListeners(socket: Socket) {
  // TODO: refactor createRoom to pass host name and return host player with color
  socket.on(Events.CreateRoom, (data: EventData[Events.CreateRoom]) => {
    const { settings, host } = data;

    // create & join room
    const code = generateRoomCode(rooms);
    rooms[code] = { settings, players: [host] };
    socket.join(code);

    // send to client
    const resData: EventData[Events.RoomCreated] = { code };
    socket.emit(Events.RoomCreated, resData);
  });

  socket.on(Events.JoinRoom, (data: EventData[Events.JoinRoom]) => {
    const { code, playerName } = data;

    // check if room exits
    if (!(code in rooms)) {
      socket.emit(Events.RoomNotFound);
      return;
    }

    const room = rooms[code];

    // check if name is available
    for (const player of room.players) {
      if (player.name === playerName) {
        socket.emit(Events.NameTaken);
        return;
      }
    }

    // add player to room
    const player: GamePlayer = { name: playerName, color: generateColor(room) };
    room.players.push(player);
    socket.join(code);

    // send to client
    const roomJoinedData: EventData[Events.RoomJoined] = { room, player };
    socket.emit(Events.RoomJoined, roomJoinedData);

    // send to other clients in room
    const playerJoinedData: EventData[Events.PlayerJoined] = { player };
    socket.to(code).emit(Events.PlayerJoined, playerJoinedData);
  });
}
