import {
  Events,
  EventData,
  GameRooms,
  GamePlayer,
  GameRoom,
} from "@connect-game/shared";
import { ExtendedSocket } from ".";
import { generateRoomCode, generateColor, reassignHost } from "../utils";

const rooms: GameRooms = {};

export function initRoomListeners(socket: ExtendedSocket) {
  socket.on(Events.CreateRoom, (data: EventData[Events.CreateRoom]) => {
    const { settings, hostName } = data;

    // create room
    const code = generateRoomCode(rooms);
    const room: GameRoom = { code, settings, players: [], inProgress: false };
    rooms[code] = room;

    // create player & join room
    const player = { name: hostName, color: generateColor(room), isHost: true };
    room.players.push(player);
    socket.join(code);
    socket.code = code;
    socket.name = hostName;

    // send to client
    const resData: EventData[Events.RoomJoined] = { room, player };
    socket.emit(Events.RoomJoined, resData);
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

    // check if game has been started
    if (room.inProgress) {
      socket.emit(Events.InProgress);
      return;
    }

    // create player & join room
    const player: GamePlayer = {
      name: playerName,
      color: generateColor(room),
      isHost: false,
    };
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
    // change room state
    rooms[socket.code].inProgress = true;

    // send to other clients in room
    socket.to(socket.code).emit(Events.StartGame);
  });

  socket.on(Events.EndGame, () => {
    // change room state
    rooms[socket.code].inProgress = false;

    // send to other clients in room
    socket.to(socket.code).emit(Events.EndGame);
  });

  const leaveRoomHandler = () => {
    if (!socket.code || !socket.name) return;

    const room = rooms[socket.code];

    if (!room) return;

    // update room.players & get leaving player
    const remaining: GamePlayer[] = [];
    let player: GamePlayer;
    for (const p of room.players) {
      p.name !== socket.name ? remaining.push(p) : (player = p);
    }
    room.players = remaining;

    // delete room if empty
    if (room.players.length === 0) {
      delete rooms[socket.code];
      return;
    }

    // reassign host if host left
    if (player!.isHost) {
      const newHost = reassignHost(room);
      newHost.isHost = true;

      // send reassignHost event to other clients in room
      const reassignHostData: EventData[Events.ReassignHost] = {
        playerName: newHost.name,
      };
      socket.to(socket.code).emit(Events.ReassignHost, reassignHostData);
    }

    // send leaveRoom event to other clients in room
    const leaveRoomData: EventData[Events.LeaveRoom] = {
      playerName: socket.name,
    };
    socket.to(socket.code).emit(Events.LeaveRoom, leaveRoomData);

    // remove code and name from socket
    socket.code = "";
    socket.name = "";
  };

  socket.on(Events.LeaveRoom, leaveRoomHandler);

  socket.on("disconnect", leaveRoomHandler);
}
