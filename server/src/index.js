import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import UserRouter from "./user/user-routes.js";
import CacheService from "./cache/cache-serivce.js";

const port = process.env.PORT;
const app = express();
const server = http.Server(app);
export const socket = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());

app.use("/api/account", UserRouter);

socket.on("connection", (socket) => {
  console.log("A user connected. Socket Id: ", socket.id);

  socket.emit("user-connected", { socketId: socket.id });

  socket.on("disconnect", async () => {
    console.log("user disconnected.Socket Id: ", socket.id);
    const usersToNotify = await CacheService.handleUserDisconnected(socket.id);
    if (usersToNotify.length > 0) {
      usersToNotify.forEach((user) => {
        const { receiverUser, notification } = user;
        socket.to(receiverUser).emit("friend-disconnected", notification);
      });
    }
  });

  socket.on("user-online-data", async (data) => {
    const { usersToNotify, friendsOnline } =
      await CacheService.handleUserConnected(data);
    socket.emit("friends-online", friendsOnline);
    if (usersToNotify.length > 0) {
      usersToNotify.forEach((user) => {
        const { receiverUser, notification } = user;
        socket.to(receiverUser).emit("friend-connected", notification);
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
