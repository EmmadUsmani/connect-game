import { createServer } from "http";
import { Server, Socket } from "socket.io";

import {
  Events,
  EventData,
  GameRoom,
  GamePlayer,
  GameColor,
} from "@connect-game/shared";

const httpServer = createServer();

// TODO: remove cors after serving front-end
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// TODO: close room once all users have left
/* Map of code to room */
const rooms: { [key: string]: GameRoom } = {};

io.on("connection", (socket: Socket) => {
  socket.on(Events.CreateRoom, (data: EventData[Events.CreateRoom]) => {
    const { settings, host } = data;
    // TODO: better code generation
    const code = Math.random().toString(36).substring(7);
    rooms[code] = { settings, players: [host] };
    socket.join(code);

    const resData: EventData[Events.RoomCreated] = { code };
    socket.emit(Events.RoomCreated, resData);
  });

  socket.on(Events.JoinRoom, (data: EventData[Events.JoinRoom]) => {
    const { code, playerName } = data;

    // TODO: assign color randomly based on availibility
    const player: GamePlayer = { name: playerName, color: GameColor.Orange };

    // TODO: handle error case where room doesn't exist
    const room = rooms[code];
    room.players.push(player);
    socket.join(code);

    const resData: EventData[Events.RoomJoined] = { room, player };
    // send to all clients in room
    io.in(code).emit(Events.RoomJoined, resData);
  });
});

httpServer.listen(3001, () => {
  console.log("Listening on port 3001");
});
