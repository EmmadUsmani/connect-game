import {
  Events,
  EventData,
  GameRooms,
  GamePlayer,
  GameRoom,
} from "@connect-game/shared";
import { ExtendedSocket } from ".";
import { generateRoomCode, generateColor } from "../utils";

// TODO: close room once all users have left
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

    // send to client
    const resData: EventData[Events.RoomCreated] = { code, player };
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
    console.log("start game", socket.code);
    socket.to(socket.code).emit(Events.StartGame);
  });
}
