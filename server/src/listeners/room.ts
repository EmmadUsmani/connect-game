import {
  Events,
  EventData,
  GameRooms,
  GamePlayer,
  GameRoom,
} from "@connect-game/shared";
import { ExtendedSocket } from ".";
import { generateRoomCode, generateColor } from "../utils";

const rooms: GameRooms = {};

export function initRoomListeners(socket: ExtendedSocket) {
  socket.on(Events.CreateRoom, (data: EventData[Events.CreateRoom]) => {
    const { settings, hostName } = data;

    // create room
    const code = generateRoomCode(rooms);
    const room: GameRoom = { settings, players: [] };
    rooms[code] = room;

    // create player & join room
    const player = { name: hostName, color: generateColor(room) };
    room.players.push(player);
    socket.join(code);
    socket.code = code;
    socket.name = hostName;

    // send to client
    const resData: EventData[Events.RoomCreated] = { code, player };
    socket.emit(Events.RoomCreated, resData);
  });

  socket.on(Events.JoinRoom, (data: EventData[Events.JoinRoom]) => {
    const { code, playerName } = data;

    // check if room exists
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
    socket.name = playerName;

    // create player & join room
    const player: GamePlayer = { name: playerName, color: generateColor(room) };
    room.players.push(player);
    socket.join(code);
    socket.code = code;

    // send to client
    const roomJoinedData: EventData[Events.RoomJoined] = { room, player };
    socket.emit(Events.RoomJoined, roomJoinedData);

    // send to other clients in room
    const playerJoinedData: EventData[Events.PlayerJoined] = { player };
    socket.to(socket.code).emit(Events.PlayerJoined, playerJoinedData);
  });

  socket.on(Events.StartGame, () => {
    // send to other clients in room
    socket.to(socket.code).emit(Events.StartGame);
  });

  socket.on("disconnect", (reason) => {
    const leaveRoomData: EventData[Events.LeaveRoom] = {
      playerName: socket.name,
    };
    socket.to(socket.code).emit(Events.LeaveRoom, leaveRoomData);
  });
}
