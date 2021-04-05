import { createServer } from "http";
import * as path from "path";
import express from "express";
import { Server } from "socket.io";

import { initListeners } from "./listeners";

const app = express();
const httpServer = createServer(app);

const buildPath = path.join(__dirname, "..", "..", "client", "build");

app.use(express.static(buildPath));

app.get("/*", (_, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// allow cors for create-react-app development
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

initListeners(io);

const port = process.env.PORT || 3001;

httpServer.listen(port, () => {
  console.log("Listening on port " + port);
});
