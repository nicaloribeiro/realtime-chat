import { io } from "socket.io-client";

const URL: string =
  process.env.NODE_ENV === "production"
    ? ""
    : import.meta.env.VITE_APP_CONNECTION_URL;

export const socket = io(URL, {
  autoConnect: false,
});
