import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { Events, EventData } from "@connect-game/shared";

const httpServer = createServer();

// TODO: remove cors after serving front-end
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
  socket.on(Events.CreateRoom, (data: EventData[Events.CreateRoom]) => {
    console.log(data.settings.boardSize);
  });
});

httpServer.listen(3001, () => {
  console.log("Listening on port 3001");
});
