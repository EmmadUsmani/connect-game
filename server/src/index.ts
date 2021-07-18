import { createServer } from "http"
import * as path from "path"

import express from "express"
import { Server } from "socket.io"

import { initListeners } from "./listeners"

const app = express()
const httpServer = createServer(app)

// serve frontend in prod
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "..", "client", "build")
  app.use(express.static(buildPath))
  app.get("/*", (_, res) => {
    res.sendFile(path.join(buildPath, "index.html"))
  })
}

// allow cors in dev
const io = new Server(
  httpServer,
  process.env.NODE_ENV === "development"
    ? {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
        },
      }
    : {}
)

initListeners(io)

const port = process.env.PORT ? +process.env.PORT : 3001

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
