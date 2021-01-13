import { createServer } from "http";

import { Server, Socket } from "socket.io";

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
  socket.on("create room", (settings) => {
    console.log(settings);
  });
});

httpServer.listen(3001, () => {
  console.log("Listening on port 3001");
});
