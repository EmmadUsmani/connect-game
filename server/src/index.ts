import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { Events, EventData, GameRoom } from "@connect-game/shared";

const httpServer = createServer();

// TODO: remove cors after serving front-end
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

/* Map of code to room */
const rooms: { [key: string]: GameRoom } = {};

io.on("connection", (socket: Socket) => {
  socket.on(Events.CreateRoom, (data: EventData[Events.CreateRoom]) => {
    const { settings, host } = data;
    // TODO: better code generation
    const code = Math.random().toString(36).substring(7);
    rooms[code] = { settings, players: [host] };

    const resData: EventData[Events.RoomCreated] = { code };
    socket.emit(Events.RoomCreated, resData);
  });
});

httpServer.listen(3001, () => {
  console.log("Listening on port 3001");
});
