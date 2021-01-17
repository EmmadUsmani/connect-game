import { createServer } from "http";
import { Server } from "socket.io";

import { initListeners } from "./listeners";

const httpServer = createServer();

// TODO: remove cors after serving front-end
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

initListeners(io);

httpServer.listen(3001, () => {
  console.log("Listening on port 3001");
});
