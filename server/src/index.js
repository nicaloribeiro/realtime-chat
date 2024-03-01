import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import UserRouter from "./user/user-routes.js";

const port = process.env.PORT;
const app = express();
const server = http.Server(app);
const socket = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());

app.use("/api/account", UserRouter);

socket.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
