import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { EventNames, EventData } from "../../shared";

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
  socket.on(
    EventNames.CreateRoom,
    (settings: EventData[EventNames.CreateRoom]) => {
      console.log(settings);
    }
  );
});

httpServer.listen(3001, () => {
  console.log("Listening on port 3001");
});
