import { Router } from "express";
import ChatController from "./chat-controller.js";

export const ChatRouter = new Router();

ChatRouter.post("/create", ChatController.create);
ChatRouter.post("/user-chats", ChatController.findChatsByUser);
