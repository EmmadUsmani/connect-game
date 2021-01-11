import { createServer } from "http";

import express from "express";
import { Server, Socket } from "socket.io";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world everyone!");
});

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  console.log(socket.id);
});

httpServer.listen(3001, () => {
  console.log("Listening on port 3001");
});
